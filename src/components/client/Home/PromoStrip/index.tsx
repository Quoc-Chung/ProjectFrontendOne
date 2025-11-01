"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";

interface PromoItem {
  id: number;
  text: string;
  highlight?: string;
  link: string;
  icon: string;
  bgColor: string;
}

const promoItems: PromoItem[] = [
  {
    id: 1,
    text: "Giảm giá",
    highlight: "50%",
    link: "/shop-with-sidebar?promo=50off",
    icon: "🎉",
    bgColor: "bg-gradient-to-r from-red-500 to-pink-600",
  },
  {
    id: 2,
    text: "Mua 1",
    highlight: "Tặng 1",
    link: "/shop-with-sidebar?promo=buy1get1",
    icon: "🎁",
    bgColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    text: "Miễn phí vận chuyển",
    highlight: "Toàn quốc",
    link: "/shop-with-sidebar",
    icon: "🚚",
    bgColor: "bg-gradient-to-r from-green-500 to-emerald-600",
  },
  {
    id: 4,
    text: "Trả góp",
    highlight: "0% Lãi suất",
    link: "/shop-with-sidebar?promo=installment",
    icon: "💳",
    bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
  },
  {
    id: 5,
    text: "Bảo hành",
    highlight: "12 Tháng",
    link: "/shop-with-sidebar",
    icon: "🛡️",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-600",
  },
];

const PromoStrip = () => {
  return (
    <section className="py-2 sm:py-3 bg-gray-50 border-y border-gray-200 w-full">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="hidden md:flex items-center justify-between gap-4 lg:gap-6">
          {promoItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              prefetch={true}
              className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`absolute inset-0 ${item.bgColor} rounded-lg sm:rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <span className="relative z-10 text-2xl sm:text-3xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                {item.icon}
              </span>
              <div className="relative z-10 text-white">
                <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                {item.highlight && (
                  <span className="block text-sm sm:text-base font-bold">{item.highlight}</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              480: {
                slidesPerView: 2.5,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="promo-strip-slider"
          >
            {promoItems.map((item) => (
              <SwiperSlide key={item.id}>
                <Link
                  href={item.link}
                  prefetch={true}
                  className="group relative flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 min-h-[80px]"
                >
                  <div className={`absolute inset-0 ${item.bgColor} rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <span className="relative z-10 text-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {item.icon}
                  </span>
                  <div className="relative z-10 text-white text-center">
                    <span className="block text-xs font-medium">{item.text}</span>
                    {item.highlight && (
                      <span className="block text-xs font-bold">{item.highlight}</span>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PromoStrip;
