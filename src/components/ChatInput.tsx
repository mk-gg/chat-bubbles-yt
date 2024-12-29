import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatBubble } from '../providers/ChatBubbleProvider';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

export const ChatInput: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { 
    colors, 
    textSize, 
    maxBubbleWidth, 
    fontFamily, 
    addMessage, 
    showPreviewDivider,
    isBottomAligned,
    previewGap,
    previewDividerColor,
    useCustomDividerColor,
    minPreviewHeight,
    inputBackgroundColor,
    previewStartsAtTop
  } = useChatBubble();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setIsTyping(e.target.value.length > 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      addMessage(inputText);
      setInputText('');
      setIsTyping(false);
    }
  };

  return (
    <div 
      className={`${showPreviewDivider ? 'border-t border-gray-200' : ''}`} 
      style={{ 
        backgroundColor: colors.backgroundColor,
        paddingTop: (!showPreviewDivider && previewStartsAtTop) ? '0' : undefined
      }}
    >
      <div 
        className={`p-4 ${isBottomAligned ? 'min-h-[100px]' : ''} flex flex-col`} 
        style={{ 
          minHeight: `${Math.max(previewGap + 16, minPreviewHeight)}px`,
          borderTopWidth: showPreviewDivider ? '1px' : '0',
          borderTopStyle: 'solid',
          borderTopColor: useCustomDividerColor ? previewDividerColor : colors.backgroundColor,
          justifyContent: previewStartsAtTop ? 'flex-start' : 'flex-end',
          paddingTop: (!showPreviewDivider && previewStartsAtTop) ? '8px' : undefined,
          paddingBottom: (!showPreviewDivider && previewStartsAtTop) ? '8px' : undefined
        }}
      >
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full"
              style={{ maxWidth: `${maxBubbleWidth}px` }}
            >
              <div 
                className="inline-block px-4 py-2 rounded-3xl rounded-bl-lg bg-opacity-50"
                style={{ 
                  backgroundColor: colors.bubbleColor,
                  maxWidth: '100%'
                }}
              >
                <p 
                  className="break-words whitespace-pre-wrap" 
                  style={{ 
                    color: colors.textColor, 
                    fontSize: `${textSize}px`,
                    fontFamily: fontFamily,
                  }}
                >
                  {inputText}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4" style={{ backgroundColor: inputBackgroundColor }}>
        <Input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};

