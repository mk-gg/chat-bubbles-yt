import React, { createContext, useContext, useEffect } from 'react';
import { useChatStore } from '../store/chat-store';

const ChatBubbleContext = createContext<ReturnType<typeof useChatStore> | null>(null);

export const ChatBubbleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useChatStore();

  useEffect(() => {
    const timer = setInterval(store.removeExpiredMessages, 1000);
    return () => clearInterval(timer);
  }, [store.removeExpiredMessages]);

  return (
    <ChatBubbleContext.Provider value={store}>
      {children}
    </ChatBubbleContext.Provider>
  );
};

export const useChatBubble = () => {
  const context = useContext(ChatBubbleContext);
  if (!context) {
    throw new Error('useChatBubble must be used within a ChatBubbleProvider');
  }
  return context;
};

