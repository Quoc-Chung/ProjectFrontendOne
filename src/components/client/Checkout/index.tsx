"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createOrderAction, resetOrderStateAction } from "@/redux/Client/Order/Action";
import { CreateOrderRequest, OrderItemRequest } from "@/types/Client/Order/order";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get cart items and auth token from Redux
  const { cart } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector((state) => state.auth);
  const { loading, success, error } = useAppSelector((state) => state.order);

  // Form state
  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    if (!token) {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      router.push("/signin");
      return;
    }

    if (cart.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    if (!shippingAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng");
      return;
    }

    // Convert cart items to order items
    const orderItems: OrderItemRequest[] = cart.map((item) => ({
      productId: item.productId,
      skuId: item.skuId, // Use skuId from cart
      quantity: item.quantity,
    }));

    const orderRequest: CreateOrderRequest = {
      items: orderItems,
      shippingAddress: shippingAddress,
    };

    // Dispatch create order action
    dispatch(
      createOrderAction(
        orderRequest,
        token,
        (res) => {
          toast.success("Đặt hàng thành công!");
          // Reset order state
          dispatch(resetOrderStateAction());
          // Redirect to order success page or order details
          router.push(`/my-account`);
        },
        (error) => {
          toast.error(`Đặt hàng thất bại: ${error}`);
        }
      )
    );
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  const shippingFee = 375000; // Fixed shipping fee
  const total = subtotal + shippingFee;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- billing details --> */}
                <Billing />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- shipping address field --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="shippingAddress" className="block mb-2.5">
                      Địa chỉ giao hàng <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="shippingAddress"
                      id="shippingAddress"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Nhập địa chỉ giao hàng"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      required
                    />
                  </div>
                </div>

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Ghi chú đơn hàng (không bắt buộc)
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ghi chú về đơn hàng của bạn, ví dụ: yêu cầu đặc biệt khi giao hàng."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Đơn hàng của bạn
                    </h3>
                  </div>

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Sản phẩm</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Thành tiền
                        </h4>
                      </div>
                    </div>

                    {/* <!-- product items from cart --> */}
                    {cart.length === 0 ? (
                      <div className="py-5 text-center text-dark-5">
                        Giỏ hàng trống
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-5 border-b border-gray-3"
                        >
                          <div>
                            <p className="text-dark">
                              {item.productName} x {item.quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-dark text-right">
                              {formatCurrency(item.productPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}

                    {/* <!-- shipping fee --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">Phí vận chuyển</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">{formatCurrency(shippingFee)}</p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Tổng cộng</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          {formatCurrency(total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod />

                {/* <!-- checkout button --> */}
                <button
                  type="submit"
                  disabled={loading || cart.length === 0}
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5 disabled:bg-gray-4 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang xử lý..." : "Tiến hành thanh toán"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
