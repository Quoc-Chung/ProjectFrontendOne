import { Category } from "@/types/category";
import React from "react";

const SingleItem = ({ item }: { item: Category }) => {
  const getImageSrc = () => {
    // Handle null or empty imageUrl
    if (!item.imageUrl || (typeof item.imageUrl === 'string' && item.imageUrl.trim() === "")) {
      console.log('⚠️ Category imageUrl is null or empty for:', item.displayName);
      return "/images/categories/categories-01.png";
    }
    
    // Return the imageUrl directly (can be external URL or local path)
    console.log('🖼️ Category image for:', item.displayName, 'URL:', item.imageUrl, 'Type:', typeof item.imageUrl);
    return item.imageUrl;
  };

  const imageSrc = getImageSrc();
  
  // Debug: Log the final image source
  React.useEffect(() => {
    console.log('🔍 SingleItem rendered for:', item.displayName, 'with imageSrc:', imageSrc);
  }, [item.displayName, imageSrc]);

  return (
    <a href={`/shop-with-sidebar?category=${item.slug}`} className="group flex flex-col items-center">
      <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 relative">
        <img 
          src={imageSrc} 
          alt={item.displayName} 
          className="object-contain"
          style={{ 
            width: '82px', 
            height: '62px',
            display: 'block'
          }}
          onError={(e) => {
            console.error('❌ Category image error for:', item.displayName, 'URL:', imageSrc);
            const target = e.target as HTMLImageElement;
            const fallbackSrc = "/images/categories/categories-01.png";
            // Only set fallback if current src is not already the fallback
            if (!target.src.includes('categories-01.png')) {
              console.log('Setting fallback image:', fallbackSrc);
              target.src = fallbackSrc;
            }
          }}
          onLoad={() => {
            console.log('✅ Category image loaded successfully for:', item.displayName, 'URL:', imageSrc);
          }}
          loading="lazy"
        />
      </div>

      <div className="flex justify-center">
        <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
          {item.displayName}
        </h3>
      </div>
    </a>
  );
};

export default SingleItem;
