"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5; 

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > maxPagesToShow - 2) {
        pageNumbers.push("...");
      }


      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= maxPagesToShow - 2) {
        endPage = maxPagesToShow - 1;
      } else if (currentPage > totalPages - (maxPagesToShow - 2)) {
        startPage = totalPages - (maxPagesToShow - 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }


      if (currentPage < totalPages - (maxPagesToShow - 2)) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return Array.from(new Set(pageNumbers)).sort((a, b) => {
      if (typeof a === 'string') return 1; 
      if (typeof b === 'string') return -1; 
      return (a as number) - (b as number);
    });
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
          !hasPrevious
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
      >
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === "string" ? (
            <span className="px-4 py-2 text-gray-600">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
          !hasNext
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
