"use client";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-6 lg:pb-8 xl:pb-10 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-gradient-to-br from-[#E5EAF4] via-[#F0F4F8] to-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          {/* Main Hero Carousel */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-2xl bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
              {/* Background decorative image with overlay */}
              <div className="absolute right-0 bottom-0 -z-1 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                <Image
                  src="/images/hero/hero-bg.png"
                  alt="hero bg shapes"
                  width={534}
                  height={520}
                  priority={true}
                  loading="eager"
                  className="object-contain"
                />
              </div>
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-0 pointer-events-none"></div>
              
              <div className="relative z-10">
                <HeroCarousel />
              </div>
            </div>
          </div>

          {/* Side Banners */}
          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              {/* PC Banner */}
              <Link 
                href="/shop-with-sidebar" 
                className="group w-full relative rounded-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-5 sm:p-7.5 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl group-hover:bg-blue-300/30 transition-all duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-200/20 rounded-full blur-xl group-hover:bg-purple-300/30 transition-all duration-500"></div>
                
                <div className="relative z-10 flex items-center gap-6 sm:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-500/10 text-red-600 text-xs font-semibold rounded-full mb-2">
                        Khuyến mãi đặc biệt
                      </span>
                    </div>
                    <h2 className="font-bold text-dark text-lg sm:text-xl mb-4 sm:mb-5 leading-tight group-hover:text-blue transition-colors duration-300">
                      PC Hiệu năng cực cao
                    </h2>

                    <div className="space-y-2">
                      <p className="font-medium text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                        Ưu đãi có thời hạn
                      </p>
                      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                        <span className="font-bold text-xl sm:text-2xl text-red-600">
                          19.999.000₫
                        </span>
                        <span className="font-medium text-base sm:text-lg text-gray-400 line-through">
                          23.000.000₫
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                          Tiết kiệm 13%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 relative">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src="/images/anhnenmoi/ThayIP14.png"
                        alt="PC Gaming hiệu năng cao"
                        fill
                        className="object-contain drop-shadow-2xl"
                        loading="lazy"
                        sizes="(max-width: 640px) 112px, 128px"
                      />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                </div>
              </Link>

              {/* Headphone Banner */}
              <Link 
                href="/shop-with-sidebar" 
                className="group w-full relative rounded-2xl bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-5 sm:p-7.5 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl group-hover:bg-orange-300/30 transition-all duration-500"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-yellow-200/20 rounded-full blur-xl group-hover:bg-yellow-300/30 transition-all duration-500"></div>
                
                <div className="relative z-10 flex items-center gap-6 sm:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-red-500/10 text-red-600 text-xs font-semibold rounded-full mb-2">
                        Khuyến mãi đặc biệt
                      </span>
                    </div>
                    <h2 className="font-bold text-dark text-lg sm:text-xl mb-4 sm:mb-5 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                      Tai nghe không dây
                    </h2>

                    <div className="space-y-2">
                      <p className="font-medium text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                        Ưu đãi có thời hạn
                      </p>
                      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                        <span className="font-bold text-xl sm:text-2xl text-red-600">
                          16.999.000₫
                        </span>
                        <span className="font-medium text-base sm:text-lg text-gray-400 line-through">
                          24.000.000₫
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                          Tiết kiệm 30%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 relative">
                    <div className="relative w-28 h-36 sm:w-32 sm:h-40 group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src="/images/hero/hero-01.png"
                        alt="Tai nghe không dây"
                        fill
                        className="object-contain drop-shadow-2xl"
                        loading="lazy"
                        sizes="(max-width: 640px) 112px, 128px"
                      />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
