"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useAppDispatch } from '../../../../redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { forgotPassword, verifyOtp } from '../../../../redux/Client/Auth/Action';
import { toast } from 'react-toastify';

const VarifierOTp: React.FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const resentOTP = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.success("🎉 Đã gửi mã OTP");      
    dispatch(
      forgotPassword(
        {email},
        () => {
          // Reset OTP fields
          setOtp(Array(6).fill(''));
          inputRefs.current[0]?.focus();
        },
        (error: any) => {
          console.error("Đăng nhập thất bại:", error);
          toast.error("Gửi email thất bại")
        }
      )
    );
  }

  const handleChange = (index: number, value: string) => {
    // Chỉ cho phép nhập số
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo khi nhập
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Xử lý Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Xử lý Arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    // Xử lý Delete
    if (e.key === 'Delete') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const pastedDigits = pastedData.split('').filter(char => /^\d$/.test(char));
    
    if (pastedDigits.length > 0) {
      const newOtp = [...otp];
      pastedDigits.forEach((digit, idx) => {
        if (idx < 6) {
          newOtp[idx] = digit;
        }
      });
      setOtp(newOtp);
      
      // Focus vào ô cuối cùng được điền hoặc ô tiếp theo
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  useEffect(() => {
    // Auto focus vào ô đầu tiên khi component mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error("❌ Vui lòng nhập đầy đủ 6 số OTP");
      return;
    }
    
    dispatch(
      verifyOtp(
        { email, otp: otpString }, 
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
        <form 
          className="flex flex-col items-center space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex items-center gap-2 justify-center">
            {otp.map((digit, index) => (
              <React.Fragment key={index}>
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onFocus={handleFocus}
                  className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg 
                           focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none
                           transition-all duration-200 bg-white"
                  autoComplete="off"
                />
                {index === 2 && (
                  <span className="text-gray-400 text-xl mx-1">-</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md 
                       hover:bg-indigo-700 transition-all duration-200"
          >
            Xác thực
          </button>

          {/* Resend OTP */}
          <p className="text-sm text-gray-500">
            Không nhận được OTP?{" "}
            <button 
              type="button"
              onClick={resentOTP}
              className="text-indigo-600 font-medium hover:underline"
            >
              Gửi lại
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default VarifierOTp;
