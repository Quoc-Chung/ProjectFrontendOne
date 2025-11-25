import React, { useState } from "react";
import Image from "next/image";

 interface PaymentMethodProps {
  value?: string;
  onChange?: (value: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ value, onChange }) => {
  const [payment, setPayment] = useState(value || "COD");

  const handlePaymentChange = (newPayment: string) => {
    setPayment(newPayment);
    if (onChange) {
      onChange(newPayment);
    }
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Phương thức thanh toán</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-3">
          {/* Thanh toán khi nhận hàng (COD) */}
          <label
            htmlFor="cod"
            className="flex cursor-pointer select-none items-center gap-4"
          >
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="cod"
                value="COD"
                checked={payment === "COD"}
                onChange={() => handlePaymentChange("COD")}
                className="sr-only"
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  payment === "COD"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div
              className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none min-w-[240px] ${
                payment === "COD"
                  ? "border-transparent bg-gray-2"
                  : " border-gray-4 shadow-1"
              }`}
            >
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/cash.svg" alt="cash" width={21} height={21} />
                </div>

                <div className="border-l border-gray-4 pl-2.5">
                  <p className="text-dark">Thanh toán khi nhận hàng</p>
                </div>
              </div>
            </div>
          </label>

          {/* Thanh toán bằng VNPay */}
          <label
            htmlFor="vnpay"
            className="flex cursor-pointer select-none items-center gap-4"
          >
            <div className="relative">
              <input
                type="radio"
                name="payment"
                id="vnpay"
                value="VNPAY"
                checked={payment === "VNPAY"}
                onChange={() => handlePaymentChange("VNPAY")}
                className="sr-only"
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  payment === "VNPAY"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>
            <div
              className={`rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 hover:bg-gray-2 hover:border-transparent hover:shadow-none min-w-[240px] ${
                payment === "VNPAY"
                  ? "border-transparent bg-gray-2"
                  : " border-gray-4 shadow-1"
              }`}
            >
              <div className="flex items-center">
                <div className="pr-2.5">
                  <Image src="/images/checkout/bank.svg" alt="vnpay" width={29} height={12}/>
                </div>

                <div className="border-l border-gray-4 pl-2.5">
                  <p className="text-dark">Thanh toán bằng VNPay</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
