"use client"
import React from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Settings,
  User
} from 'lucide-react';
import { Employee } from '@/types/Admin';
import { formatPrice, formatDate, getRoleColor, getRoleBadge }  from '../../utils/helpers';
interface EmployeeManagementProps {
  employees: Employee[];
}

export const EmployeeManagement: React.FC<EmployeeManagementProps> = ({ employees }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Quản Lý Nhân Viên & Phân Quyền</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
          <Plus size={20} />
          <span>Thêm Nhân Viên</span>
        </button>
      </div>

      {/* Employee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-900">{employees.filter(e => e.role === 'Admin').length}</p>
            <p className="text-sm text-purple-600">Quản trị viên</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{employees.filter(e => e.role === 'Manager').length}</p>
            <p className="text-sm text-blue-600">Quản lý</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">{employees.filter(e => e.role === 'Sales').length}</p>
            <p className="text-sm text-green-600">Nhân viên bán hàng</p>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-900">{employees.filter(e => e.role === 'Warehouse').length}</p>
            <p className="text-sm text-orange-600">Nhân viên kho</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nhân viên</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Liên hệ</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Chức vụ</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phòng ban</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày vào</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lương</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRoleColor(employee.role)}`}>
                        <User size={20} className="text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{employee.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(employee.role).color}`}>
                      {getRoleBadge(employee.role).text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(employee.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {employee.salary ? formatPrice(employee.salary) : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors">
                        <Settings size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ma Trận Phân Quyền</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Chức năng</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-purple-700">Admin</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-blue-700">Manager</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-green-700">Sales</th>
                <th className="px-4 py-2 text-center text-sm font-medium text-orange-700">Warehouse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { feature: 'Quản lý sản phẩm', admin: true, manager: true, sales: false, warehouse: false },
                { feature: 'Quản lý kho hàng', admin: true, manager: true, sales: false, warehouse: true },
                { feature: 'Quản lý đơn hàng', admin: true, manager: true, sales: true, warehouse: false },
                { feature: 'Quản lý khách hàng', admin: true, manager: true, sales: true, warehouse: false },
                { feature: 'Quản lý nhân viên', admin: true, manager: false, sales: false, warehouse: false },
                { feature: 'Báo cáo & thống kê', admin: true, manager: true, sales: false, warehouse: false }
              ].map((perm, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm text-gray-900">{perm.feature}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`w-4 h-4 rounded-full inline-block ${perm.admin ? 'bg-green-500' : 'bg-red-500'}`} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`w-4 h-4 rounded-full inline-block ${perm.manager ? 'bg-green-500' : 'bg-red-500'}`} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`w-4 h-4 rounded-full inline-block ${perm.sales ? 'bg-green-500' : 'bg-red-500'}`} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`w-4 h-4 rounded-full inline-block ${perm.warehouse ? 'bg-green-500' : 'bg-red-500'}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};