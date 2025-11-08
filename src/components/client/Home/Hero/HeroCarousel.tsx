"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/effect-fade";

import Image from "next/image";

const HeroCarousel = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination, EffectFade]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5 relative z-10">
            {/* Discount Badge with animation */}
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10 animate-fade-in">
              <div className="relative">
                <span className="block font-bold text-4xl sm:text-5xl lg:text-6xl text-blue drop-shadow-lg">
                  30%
                </span>
                <div className="absolute inset-0 bg-blue-200/30 blur-xl -z-10 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="block font-bold text-dark text-lg sm:text-xl lg:text-2xl leading-tight">
                  Giảm
                </span>
                <span className="block font-bold text-dark text-lg sm:text-xl lg:text-2xl leading-tight">
                  Giá
                </span>
              </div>
            </div>

            {/* Title with hover effect */}
            <h1 className="font-bold text-dark text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight">
              <Link 
                href="/shop-with-sidebar" 
                className="hover:text-blue transition-colors duration-300 inline-block"
              >
                Tai nghe không dây chống ồn chủ động
              </Link>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-[350px]">
              Trải nghiệm âm thanh tuyệt vời với công nghệ chống ồn chủ động và chất lượng âm thanh cao cấp.
            </p>

            {/* CTA Button with enhanced styling */}
            <Link
              href="/shop-with-sidebar"
              className="group inline-flex items-center gap-2 font-semibold text-white text-sm sm:text-base rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 px-8 sm:px-10 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Mua ngay</span>
              <svg 
                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>

          {/* Image with enhanced effects */}
          <div className="relative flex-1 flex items-center justify-center sm:justify-end pr-4 sm:pr-7.5 lg:pr-12.5 py-6 sm:py-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/hero/hero-01.png"
                  alt="Tai nghe không dây chống ồn chủ động"
                  width={380}
                  height={380}
                  className="object-contain drop-shadow-2xl"
                  priority
                  quality={95}
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
          <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5 relative z-10">
            {/* Discount Badge with animation */}
            <div className="flex items-center gap-4 mb-7.5 sm:mb-10 animate-fade-in">
              <div className="relative">
                <span className="block font-bold text-4xl sm:text-5xl lg:text-6xl text-blue drop-shadow-lg">
                  40%
                </span>
                <div className="absolute inset-0 bg-blue-200/30 blur-xl -z-10 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="block font-bold text-dark text-lg sm:text-xl lg:text-2xl leading-tight">
                  Giảm
                </span>
                <span className="block font-bold text-dark text-lg sm:text-xl lg:text-2xl leading-tight">
                  Giá
                </span>
              </div>
            </div>

            {/* Title with hover effect */}
            <h1 className="font-bold text-dark text-2xl sm:text-3xl lg:text-4xl mb-4 leading-tight">
              <Link 
                href="/shop-with-sidebar" 
                className="hover:text-blue transition-colors duration-300 inline-block"
              >
                Bộ sưu tập Laptop Gaming cao cấp
              </Link>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed max-w-[350px]">
              Hiệu năng mạnh mẽ với card đồ họa RTX và bộ xử lý Intel Core i9 thế hệ mới nhất.
            </p>

            {/* CTA Button with enhanced styling */}
            <Link
              href="/shop-with-sidebar"
              className="group inline-flex items-center gap-2 font-semibold text-white text-sm sm:text-base rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 px-8 sm:px-10 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Mua ngay</span>
              <svg 
                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>

          {/* Image with enhanced effects */}
          <div className="relative flex-1 flex items-center justify-center sm:justify-end pr-4 sm:pr-7.5 lg:pr-12.5 py-6 sm:py-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] aspect-square group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/images/hero/hero-01.png"
                  alt="Laptop Gaming cao cấp"
                  width={380}
                  height={380}
                  className="object-contain drop-shadow-2xl"
                  priority={false}
                  quality={95}
                />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
