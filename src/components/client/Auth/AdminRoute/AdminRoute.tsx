'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState } from '../../../../redux/store'

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const router = useRouter()
  const { isLogin, roleNames, loading } = useSelector((state: RootState) => state.auth)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Đợi một chút để Redux store được khởi tạo hoàn toàn
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isChecking) return

    // Kiểm tra nếu user chưa đăng nhập
    if (!isLogin) {
      console.log('User not logged in, redirecting to signin')
      router.push('/signin')
      return
    }

    // Kiểm tra nếu user không có quyền admin
    if (!roleNames || !Array.isArray(roleNames) || !roleNames.includes('ADMIN')) {
      console.log('User does not have ADMIN role, redirecting to 403. Current roles:', roleNames)
      router.push('/403')
      return
    }

    console.log('User has ADMIN access, allowing access')
  }, [isLogin, roleNames, router, isChecking])

  // Hiển thị loading khi đang kiểm tra hoặc đang loading
  if (isChecking || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Đang kiểm tra quyền truy cập...</p>
          <p className="mt-2 text-gray-500 text-sm">Vui lòng đợi trong giây lát</p>
        </div>
      </div>
    )
  }

  // Nếu đã kiểm tra xong và có quyền admin, hiển thị children
  if (isLogin && roleNames && Array.isArray(roleNames) && roleNames.includes('ADMIN')) {
    return <>{children}</>
  }

  // Fallback loading nếu chưa xác định được trạng thái
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang xác thực...</p>
      </div>
    </div>
  )
}

export default AdminRoute