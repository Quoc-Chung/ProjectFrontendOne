import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "./Hero";

// Lazy load non-critical components
const Categories = dynamic(() => import("./Categories"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const NewArrival = dynamic(() => import("./NewArrivals"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const PromoBanner = dynamic(() => import("./PromoBanner"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const BestSeller = dynamic(() => import("./BestSeller"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const CounDown = dynamic(() => import("./Countdown"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const Testimonials = dynamic(() => import("./Testimonials"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const Newsletter = dynamic(() => import("../Common/Newsletter"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>,
});

const Home = () => {
  return (
    <main>
      {/* Critical above-the-fold content */}
      <Hero />
      
      {/* Non-critical content with lazy loading */}
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <Categories />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <NewArrival />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <PromoBanner />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <BestSeller />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <CounDown />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>}>
        <Newsletter />
      </Suspense>
    </main>
  );
};

export default Home;
