"use client";
import React from "react";
import { useChatAIModalContext } from "@/app/context/ChatAIModalContext";

const FloatingChatButton = () => {
  const { openChatAIModal } = useChatAIModalContext();

  return (
    <div className="fixed bottom-6 right-6 z-[9998]">
      {/* Floating Action Button */}
      <button
        onClick={openChatAIModal}
        className="group relative w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
        title="Chat với AI Assistant"
      >
        {/* Main button content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white group-hover:scale-110 transition-transform duration-300"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.35 14.99 2.97 16.28L2 22L7.72 21.03C9.01 21.65 10.46 22 12 22C17.52 22 22 17.52 22 12S17.52 2 12 2ZM12 20C10.74 20 9.54 19.81 8.44 19.46L8 19.25L4.75 20L5.54 16.75L5.33 16.31C4.98 15.21 4.79 14.01 4.79 12.75C4.79 7.31 8.31 3.79 13.75 3.79S22.71 7.31 22.71 12.75S19.19 20 12 20Z"
              fill="currentColor"
            />
            <path
              d="M8.5 9.5C8.5 8.95 8.95 8.5 9.5 8.5S10.5 8.95 10.5 9.5S10.05 10.5 9.5 10.5S8.5 10.05 8.5 9.5ZM14.5 9.5C14.5 8.95 14.95 8.5 15.5 8.5S16.5 8.95 16.5 9.5S16.05 10.5 15.5 10.5S14.5 10.05 14.5 9.5ZM12 15.5C10.5 15.5 9.5 14.5 9.5 13H14.5C14.5 14.5 13.5 15.5 12 15.5Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
          AI
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          Chat với AI Assistant
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </button>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-3 right-3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default FloatingChatButton;
