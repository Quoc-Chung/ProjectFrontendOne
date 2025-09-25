"use client"
import React, { useState } from 'react'
import { useAppDispatch } from '../../../../redux/store';
import { resetPassword } from '../../../../redux/Client/Auth/Action';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';


const ResetForgetPassword = () => {

    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const [formData, setFormData] = useState<ResetForgetPassword>({
        newPassword: "",
        confirmPassword:"" 
    })
    const router = useRouter()

    const dispatch = useAppDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            email,
            ...formData
        };

         dispatch(
             resetPassword(
                payload,
                () => {
                  toast.success("Thanh cong. Vui long dang nhap lai.");
                  router.replace("/signin");
                  
                },
                (error: any) => {
                  console.error("Xác thực OTP thất bại:", error);
                  toast.error("Xác thực OTP thất bại.");
                }
              )
            );
        
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    return (
          <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4">
           <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        
            <form onSubmit={handleSubmit} className="mt-5.5">
                {/* account */}
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
                        placeholder="Enter your new password"
                        required
                        className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                    />
                </div>

                {/* old Password */}
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2.5">
                        Confirm Password<span className="text-red">*</span>
                    </label>
                    <input
                        type="text"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter your confirm password"
                        required
                        className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                    />
                </div>


                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
                >
                    Reset Password 
                </button>
            </form>
        </div>
        </section>
    )
}

export default ResetForgetPassword; 