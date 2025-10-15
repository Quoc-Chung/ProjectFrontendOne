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
      return null
    }

    // Decode JWT token để lấy thông tin user
    // JWT token có format: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const payload = JSON.parse(atob(parts[1]))
    
    return {
      token,
      roleNames: payload.roleNames || [],
      isLogin: true
    }
  } catch (error) {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Kiểm tra nếu là admin route
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    const user = getUserFromToken(request)
    
    // Nếu không có token hoặc không đăng nhập
    if (!user || !user.isLogin) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
    
    // Kiểm tra quyền admin
    if (!user.roleNames.includes('ADMIN')) {
      return NextResponse.redirect(new URL('/403', request.url))
    }
  }
  
  // Kiểm tra các route cần đăng nhập (không phải admin)
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
