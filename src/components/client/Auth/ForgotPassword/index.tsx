"use client";

import Breadcrumb from "@/components/client/Common/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { forgotPassword, login } from "../../../../redux/Client/Auth/Action";
import { useAppDispatch } from "../../../../redux/store";
import { toast } from "react-toastify";


interface EmailForgetPassword{
    email : string; 
}

const ForgetPassword = () => {

  const [formData, setFormData] = useState<EmailForgetPassword>({
     email : "" 
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  function handleClickSendEmail(e): void {
    e.preventDefault();
    
    // Validate email trước khi gửi
    if (!formData.email || !formData.email.includes('@')) {
      toast.error("Vui lòng nhập email hợp lệ");
      return;
    }

    dispatch(
      forgotPassword(
        formData,
        (response: any) => {
          // Chỉ chuyển hướng khi API trả về thành công
          toast.success("🎉 Đã gửi mã OTP thành công!");
          router.replace(`/verifyotp?email=${encodeURIComponent(formData.email)}`);
        },
        (error: any) => {
          console.error("Gửi email thất bại:", error);
          // Hiển thị thông báo lỗi cụ thể
          if (error.includes("không tồn tại") || error.includes("Entity does not exist")) {
            toast.error("Email không tồn tại trong hệ thống. Vui lòng kiểm tra lại!");
          } else {
            toast.error("Gửi email thất bại. Vui lòng thử lại sau!");
          }
        }
      )
    );
  }

  return (
    <>
      <Breadcrumb title={"Foget Password"} pages={["forgot-password"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Nhập email 
              </h2>
              <p>Nhập địa chỉ email bạn đã đăng ký. Chúng tôi sẽ gửi mã xác thực (OTP) tới email này.</p>
            </div>

            <form >
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Email 
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your account"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>


              <button
                type="button"
                onClick={handleClickSendEmail}
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
              >
                Send Email
              </button>


            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
