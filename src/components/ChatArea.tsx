import React, { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useChatBubble } from '../providers/ChatBubbleProvider';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { Message } from '@/types';

export const ChatArea: React.FC = () => {
  const { messages, colors, isBottomAligned, previewGap } = useChatBubble();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBottomAligned && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBottomAligned]);

  return (
    <div className="flex flex-col h-full">
      <div 
        className={`flex-1 overflow-y-auto p-4 ${isBottomAligned ? 'flex flex-col justify-end' : ''}`}
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div className={`space-y-4 ${isBottomAligned ? 'w-full' : ''}`}>
          <AnimatePresence>
            {messages.map((message: Message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  height: 0, 
                  marginBottom: 0,
                  transition: { 
                    opacity: { duration: 0.2 },
                    height: { duration: 0.3, delay: 0.1 },
                    marginBottom: { duration: 0.3, delay: 0.1 }
                  }
                }}
                transition={{ duration: 0.3 }}
              >
                <ChatBubble message={message} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div style={{ height: `${previewGap}px` }} />
      <ChatInput />
    </div>
  );
};

