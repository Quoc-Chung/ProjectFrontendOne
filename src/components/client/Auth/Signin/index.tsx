"use client";

import Breadcrumb from "@/components/client/Common/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { login } from "../../../../redux/Client/Auth/Action";
import { LoginRequest } from "../../../../types/Client/Auth/LoginRequest";
import { useAppDispatch } from "../../../../redux/store";
import { toast } from "react-toastify";

const Signin = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    account: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const savedAccount = localStorage.getItem("account");
    const savedPassword = localStorage.getItem("password");

    setFormData({
      account: savedAccount || "",
      password: savedPassword || "",
    });

    localStorage.removeItem("account");
    localStorage.removeItem("password");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Đăng nhập với:", formData);

    dispatch(
      login(
        formData,
        () => {
          toast.success("🎉 Đăng nhập thành công");
          if (formData.account === "admin") {
            router.push("/admin-app");
          } else {
            router.push("/");
          }
        },
        (error: any) => {
          console.error("Đăng nhập thất bại:", error);
        }
      )
    );
  };
  return (
    <>
      <Breadcrumb title={"Signin"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
              <p>Enter your detail below</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="account" className="block mb-2.5">
                  Account / Email
                </label>
                <input
                  type="text"
                  name="account"
                  id="account"
                  placeholder="Enter your account"
                  value={formData.account}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="on"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-3 bg-gray-1 w-full py-3 px-5"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg hover:bg-blue mt-7.5"
              >
                Sign in to account
              </button>

              <p className="text-center mt-6">
                Don&apos;t have an account?
                <Link href="/signup" className="text-dark hover:text-blue pl-2">
                  Sign Up Now!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
