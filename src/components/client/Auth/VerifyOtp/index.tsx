"use client"
import React, { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAppDispatch } from '../../../../redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { forgotPassword, verifyOtp } from '../../../../redux/Client/Auth/Action';
import { toast } from 'react-toastify';

const VarifierOTp: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const resentOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    toast.success("🎉 Da gui ma OTP");      
        e.preventDefault();
          dispatch(
              forgotPassword(
                {email},
                () => {
                          
                },
                (error: any) => {
                  console.error("Đăng nhập thất bại:", error);
                  toast.error("Gửi email thất bại ")
                }
              )
            );
  }

  const [formData, setFormData] = useState<VerifyOtp>({
    email: "",
    otp: ""
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = () => {               
    setFormData((prev) => ({ ...prev, email: email }))
    dispatch(
      verifyOtp(
        { ...formData, email }, 
        () => {
          toast.success("🎉 Xác thực OTP thành công");
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        },
        (error: any) => {
          console.error("Xác thực thất bại:", error);
          toast.error("❌ Mã OTP không đúng hoặc đã hết hạn.");
        }
      )
    );    
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Xác thực OTP</h2>
          <p className="mt-2 text-gray-600">
            Mã OTP đã được gửi đến <span className="font-semibold text-indigo-600">{email}</span>
          </p>
          <p className="text-sm text-gray-500">Vui lòng nhập mã gồm 6 số để tiếp tục</p>
        </div>

        {/* OTP Input */}
        <form className="flex flex-col items-center space-y-6">
          <InputOTP 
            maxLength={6}
            value={formData.otp}
            onChange={(value: string) =>
              setFormData((prev) => ({ ...prev, otp: value }))
            }
            className="flex justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
                       hover:bg-indigo-700 transition-all duration-200"
          >
            Xác thực
          </button>

          {/* Resend OTP */}
          <p className="text-sm text-gray-500">
            Không nhận được OTP?{" "}
            <button type="button"
              onClick={resentOTP}
              className="text-indigo-600 font-medium hover:underline">
              Gửi lại
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default VarifierOTp;
