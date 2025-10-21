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
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Giảm thời gian checking
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 50) // Giảm từ 100ms xuống 50ms

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isChecking || !isHydrated) return

    // Kiểm tra nếu user chưa đăng nhập
    if (!isLogin) {
      console.log('User not logged in, redirecting to signin')
      router.push('/signin')
      return
    }

    // Kiểm tra nếu user không có quyền admin
    if (!roleNames || !Array.isArray(roleNames) || !roleNames.includes('Administrator')) {
      console.log('User does not have Administrator role, redirecting to 403. Current roles:', roleNames)
      router.push('/403')
      return
    }

    console.log('User has Administrator access, allowing access')
  }, [isHydrated, isLogin, roleNames, router, isChecking])

  // Hiển thị loading khi đang kiểm tra hoặc đang loading hoặc chưa hydrate
  if (isChecking || loading || !isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[200px] bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Đang kiểm tra quyền...</p>
        </div>
      </div>
    )
  }

  // Nếu đã kiểm tra xong và có quyền admin, hiển thị children
  if (isLogin && roleNames && Array.isArray(roleNames) && roleNames.includes('Administrator')) {
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