"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatAIModalContextType {
  isOpen: boolean;
  openChatAIModal: () => void;
  closeChatAIModal: () => void;
}

const ChatAIModalContext = createContext<ChatAIModalContextType | undefined>(undefined);

export const useChatAIModalContext = () => {
  const context = useContext(ChatAIModalContext);
  if (!context) {
    throw new Error("useChatAIModalContext must be used within a ChatAIModalProvider");
  }
  return context;
};

interface ChatAIModalProviderProps {
  children: ReactNode;
}

export const ChatAIModalProvider: React.FC<ChatAIModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openChatAIModal = () => {
    setIsOpen(true);
  };

  const closeChatAIModal = () => {
    setIsOpen(false);
  };

  return (
    <ChatAIModalContext.Provider
      value={{
        isOpen,
        openChatAIModal,
        closeChatAIModal,
      }}
    >
      {children}
    </ChatAIModalContext.Provider>
  );
};
