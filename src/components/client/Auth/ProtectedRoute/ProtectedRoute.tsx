'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { RootState } from '../../../../redux/store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()
  const { isLogin, loading, token } = useSelector((state: RootState) => state.auth)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Wait a bit for redux-persist to rehydrate
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated && !loading) {
      // Check both Redux state and localStorage as fallback
      let hasAuth = token || isLogin;
      
      // Fallback: check localStorage directly if Redux state is not ready
      if (!hasAuth && typeof window !== 'undefined') {
        try {
          const persistAuth = localStorage.getItem('persist:auth');
          if (persistAuth) {
            const parsed = JSON.parse(persistAuth);
            const authState = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
            // Check token or isLogin
            hasAuth = !!(authState?.token || authState?.isLogin === true || authState?.isLogin === 'true');
          }
        } catch (e) {
          // Ignore parsing errors, continue with Redux state
          console.warn('Error checking localStorage for auth:', e);
        }
      }
      
      if (!hasAuth) {
        // Store redirect URL
        if (typeof window !== 'undefined') {
          localStorage.setItem('redirectAfterLogin', window.location.pathname);
        }
        toast.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập!", {
          autoClose: 2000,
          position: "top-right"
        });
        router.push('/signin');
      }
    }
  }, [isHydrated, isLogin, loading, token, router])

  // Loading state - wait for hydration and initial load
  if (loading || !isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Check both token and isLogin, with localStorage fallback
  let hasAuth = token || isLogin;
  
  // Fallback: check localStorage directly if Redux state shows not logged in
  if (!hasAuth && typeof window !== 'undefined') {
    try {
      const persistAuth = localStorage.getItem('persist:auth');
      if (persistAuth) {
        const parsed = JSON.parse(persistAuth);
        const authState = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
        hasAuth = !!(authState?.token || authState?.isLogin === true || authState?.isLogin === 'true');
      }
    } catch (e) {
      // Ignore parsing errors, use Redux state
      console.warn('Error checking localStorage for auth:', e);
    }
  }
  
  // Nếu chưa đăng nhập, không hiển thị gì (sẽ redirect)
  if (!hasAuth) {
    return null
  }

  // Nếu đã đăng nhập, hiển thị children
  return <>{children}</>
}

export default ProtectedRoute
