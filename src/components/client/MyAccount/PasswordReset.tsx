import React from 'react'
import { ChangePassword } from '../../../types/Client/Auth/ChangePassword'
import { useState } from 'react'
import { useAppDispatch } from '../../../redux/store'
import { changePassword } from '../../../redux/Client/Auth/Action'
import { toast } from 'react-toastify'
const PasswordReset = () => {

    const [formData, setFormData] = useState<ChangePassword>({
        account: "",
        oldPassword: "",
        newPassword: ""
    })

    const dispatch = useAppDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            changePassword(
                formData,
                () => {
                    toast.success("🎉Đổi mật khẩu thành công");
                },
                (err) => {
                    toast.error(`Logout thất bại: ${err}`);
                }
            )
        );
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    return (
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="mt-5.5">
                {/* account */}
                <div className="mb-5">
                    <label htmlFor="fullname" className="block mb-2.5">
                        Account <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        name="account"
                        id="account"
                        value={formData.account}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                    />
                </div>

                {/* old Password */}
                <div className="mb-5">
                    <label htmlFor="oldPassword" className="block mb-2.5">
                        Old Password<span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        name="oldPassword"
                        id="oldPassword"
                        value={formData.account}
                        onChange={handleChange}
                        placeholder="Enter your account"
                        required
                        className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                    />
                </div>

                {/*newPassword  */}
                <div className="mb-5">
                    <label htmlFor="newPassword" className="block mb-2.5">
                        New password <span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                        className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
                >
                    Change Password
                </button>
            </form>
        </div>
    )
}

export default PasswordReset