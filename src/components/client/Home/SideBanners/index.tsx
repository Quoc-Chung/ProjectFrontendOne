"use client";

import Image from "next/image";
import Link from "next/link";

interface SideBanner {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  position: "left" | "right";
  bgGradient: string;
}

const sideBanners: SideBanner[] = [
  {
    id: 1,
    image: "/images/promo/promo-01.png",
    title: "Laptop Gaming",
    subtitle: "Hiệu năng mạnh mẽ",
    link: "/shop-with-sidebar?category=laptop",
    position: "left",
    bgGradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
  },
  {
    id: 2,
    image: "/images/promo/promo-02.png",
    title: "Smartphone Flagship",
    subtitle: "Công nghệ tiên tiến",
    link: "/shop-with-sidebar?category=phone",
    position: "right",
    bgGradient: "bg-gradient-to-br from-purple-600 to-pink-600",
  },
];

interface SideBannersProps {
  position?: "left" | "right" | "all";
}

const SideBanners = ({ position = "all" }: SideBannersProps) => {
  const bannersToShow = position === "all" 
    ? sideBanners 
    : sideBanners.filter(b => b.position === position);

  return (
    <div className="h-full flex flex-col gap-4 sm:gap-6">
      {bannersToShow.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              prefetch={true}
              className="group relative block rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
                <div className={`relative h-[200px] sm:h-[280px] lg:h-full min-h-[300px] ${banner.bgGradient} overflow-hidden`}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {banner.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {banner.subtitle}
                    </p>
                  </div>

                  {/* Icon/Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
      ))}
    </div>
  );
};

export default SideBanners;
