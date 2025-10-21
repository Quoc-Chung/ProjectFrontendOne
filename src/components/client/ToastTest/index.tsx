'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const ToastTest = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      // Test toast ngay khi component mount
      console.log('Testing toast...')
      setTimeout(() => {
        toast.warning("Test toast - Bạn chưa đăng nhập!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        console.log('Test toast displayed')
      }, 1000)
    }
  }, [isHydrated])

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Toast Test</h2>
      <p className="text-gray-600">Kiểm tra console để xem toast có hoạt động không</p>
      <p className="text-sm text-gray-500 mt-2">Toast sẽ hiển thị sau 1 giây</p>
    </div>
  )
}

export default ToastTest
