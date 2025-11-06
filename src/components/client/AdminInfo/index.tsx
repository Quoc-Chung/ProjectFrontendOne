'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const AdminInfo = () => {
  const { user, roleNames } = useSelector((state: RootState) => state.auth)

  if (!user) return null

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user.fullName?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-blue-900 truncate">
            {user.fullName}
          </p>
          <p className="text-xs text-blue-700">
            Quyền: {roleNames.length > 0 ? roleNames.join(', ') : 'Không có quyền'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminInfo
