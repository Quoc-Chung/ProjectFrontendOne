import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Danh sách các route cần bảo vệ
const protectedRoutes = [
  '/cart',
  '/my-account',
  '/orders',
  '/checkout',
  '/wishlist'
]

// Danh sách các route chỉ dành cho admin
const adminRoutes = [
  '/admin-app'
]

// Danh sách các route công khai (không cần đăng nhập)
const publicRoutes = [
  '/',
  '/signin',
  '/signup',
  '/forgot-password',
  '/verifyotp',
  '/reset-password',
  '/shop-with-sidebar',
  '/shop-without-sidebar',
  '/contact',
  '/blogs'
]

// Hàm kiểm tra token và role từ cookie
function getUserFromToken(request: NextRequest) {
  try {
    // Lấy token từ cookie
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      console.log('[Middleware] No token cookie found');
      return null
    }

    // Lấy roleNames từ cookie riêng (vì JWT có thể không chứa roleNames)
    const roleNamesCookie = request.cookies.get('userRoleNames')?.value;
    let roleNames: string[] = [];
    
    if (roleNamesCookie) {
      try {
        // Cookie có thể đã được encode, decode nếu cần
        let decodedValue = roleNamesCookie;
        try {
          decodedValue = decodeURIComponent(roleNamesCookie);
        } catch {
          // Nếu không decode được, dùng giá trị gốc
          decodedValue = roleNamesCookie;
        }
        roleNames = JSON.parse(decodedValue);
        console.log('[Middleware] RoleNames from cookie:', roleNames);
      } catch (e) {
        console.error('[Middleware] Error parsing roleNames cookie:', e);
      }
    }

    let jwtRoleNames: string[] = [];
    try {
      const parts = token.split('.')
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]))
        console.log('[Middleware] Decoded JWT payload:', JSON.stringify(payload));
        // JWT có thể có "roles" (array) thay vì "roleNames"
        const rawRoles = payload.roleNames || payload.roles || payload.authorities || [];
        // Map roles từ JWT format (ADMIN) sang format chuẩn (Administrator)
        jwtRoleNames = rawRoles.map((role: string) => {
          // Map các role phổ biến
          if (role === 'ADMIN' || role === 'Administrator') return 'Administrator';
          if (role === 'MANAGER' || role === 'Manager') return 'Manager';
          if (role === 'SALES' || role === 'Sales') return 'Sales';
          if (role === 'WAREHOUSE' || role === 'Warehouse') return 'Warehouse';
          // Giữ nguyên nếu không match
          return role;
        });
        console.log('[Middleware] Raw roles from JWT:', rawRoles);
        console.log('[Middleware] Mapped roleNames from JWT:', jwtRoleNames);
      }
    } catch (e) {
      console.error('[Middleware] Error decoding JWT:', e);
    }
    
    // Ưu tiên roleNames từ cookie (từ response API - đã đúng format), nếu không có thì dùng từ JWT (đã map)
    const finalRoleNames = (roleNames && roleNames.length > 0) ? roleNames : jwtRoleNames;
    
    console.log('[Middleware] Final roleNames (from cookie or JWT):', finalRoleNames);
    
    return {
      token,
      roleNames: Array.isArray(finalRoleNames) ? finalRoleNames : [],
      isLogin: true
    }
  } catch (error) {
    console.error('[Middleware] Error parsing token:', error);
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Kiểm tra nếu là admin route
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    const user = getUserFromToken(request)
    
    console.log('[Middleware] Admin route check:', {
      pathname,
      hasUser: !!user,
      isLogin: user?.isLogin,
      roleNames: user?.roleNames,
      hasAdminRole: user?.roleNames?.includes('Administrator')
    });
    
    // Nếu không có token hoặc không đăng nhập
    if (!user || !user.isLogin) {
      console.log('[Middleware] Redirecting to signin - no user or not logged in');
      const signinUrl = new URL('/signin', request.url);
      signinUrl.searchParams.set('showToast', 'true');
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }
    
    // Kiểm tra quyền admin - check nhiều format
    const hasAdminRole = user.roleNames && Array.isArray(user.roleNames) && (
      user.roleNames.includes('Administrator') || 
      user.roleNames.includes('ADMIN') ||
      user.roleNames.includes('admin') ||
      user.roleNames.some((role: string) => {
        const roleUpper = String(role).toUpperCase().trim();
        return roleUpper === 'ADMIN' || roleUpper === 'ADMINISTRATOR';
      })
    );
    
    console.log('[Middleware] Admin role check:', {
      roleNames: user.roleNames,
      includesAdministrator: user.roleNames?.includes('Administrator'),
      includesADMIN: user.roleNames?.includes('ADMIN'),
      includesadmin: user.roleNames?.includes('admin'),
      hasAdminRole
    });
    
    if (!hasAdminRole) {
      console.log('[Middleware] Redirecting to 403 - no admin role. Current roles:', user.roleNames);
      return NextResponse.redirect(new URL('/403', request.url));
    }
    
    console.log('[Middleware] Admin access granted');
  }
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const user = getUserFromToken(request)
    
    if (!user || !user.isLogin) {
      // Thêm query parameter để client biết cần hiển thị toast
      const url = new URL('/signin', request.url)
      url.searchParams.set('redirect', pathname)
      url.searchParams.set('showToast', 'true')
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
