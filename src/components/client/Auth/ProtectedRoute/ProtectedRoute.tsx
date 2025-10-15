'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '../../../../redux/store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter()
  const { isLogin, loading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Chỉ kiểm tra khi không đang loading
    if (!loading && !isLogin) {
      router.push('/signin')
    }
  }, [isLogin, loading, router])

  // Nếu đang loading, hiển thị loading nhẹ
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
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
