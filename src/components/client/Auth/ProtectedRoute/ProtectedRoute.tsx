'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '../../../../redux/store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()
  const { isLogin, loading } = useSelector((state: RootState) => state.auth)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Hydration nhanh hơn
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 50); // Giảm từ immediate xuống 50ms
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated && !loading && !isLogin) {
      router.push('/signin')
    }
  }, [isHydrated, isLogin, loading, router])

  // Loading state tối ưu hơn
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

  // Nếu chưa đăng nhập, không hiển thị gì (sẽ redirect)
  if (!isLogin) {
    return null
  }

  // Nếu đã đăng nhập, hiển thị children
  return <>{children}</>
}

export default ProtectedRoute
