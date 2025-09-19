"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";   
import Breadcrumb from "@/components/client/Common/Breadcrumb";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/store";
import { Register } from "@/types/Client/Auth/Register";
import { register } from "../../../../redux/Client/Auth/Action";

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); 

  const [formData, setFormData] = useState<Register>({
    account: "",
    password: "",
    email: "",
    fullname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register data:", formData);
  
    dispatch(
      register(
        formData,
        () => {
           localStorage.setItem("account", formData.account); 
           localStorage.setItem("password", formData.password)
          toast.success("🎉 Đăng kí thành công");
          setTimeout(() => {
            router.push("/signin");
          }, 2000);
        },
        (err) => {
          toast.error(`Đăng ký thất bại: ${err}`);
        }
      )
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb title="Signup" pages={["Signup"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            {/* Heading */}
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account
              </h2>
              <p>Enter your details below</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5.5">
              {/* Fullname */}
              <div className="mb-5">
                <label htmlFor="fullname" className="block mb-2.5">
                  Full Name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              {/* Account */}
              <div className="mb-5">
                <label htmlFor="account" className="block mb-2.5">
                  Account <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  name="account"
                  id="account"
                  value={formData.account}
                  onChange={handleChange}
                  placeholder="Enter your account"
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Password <span className="text-red">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
              >
                Create Account
              </button>

              {/* Sign in link */}
              <p className="text-center mt-6">
                Already have an account?
                <Link href="/signin" className="text-dark hover:text-blue pl-2">
                  Sign in Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
