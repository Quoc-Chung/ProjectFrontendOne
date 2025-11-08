import React from "react";
import SingleItem from "./SingleItem";
import Image from "next/image";
import Link from "next/link";
import shopData from "@/components/client/Shop/shopData";

const BestSeller = () => {
  return (
    <section className="overflow-hidden py-6 bg-gray-50">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              Tháng này
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Sản phẩm bán chạy
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {/* <!-- Best Sellers item --> */}
          {shopData.slice(1, 7).map((item, key) => (
            <SingleItem item={item} key={key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
