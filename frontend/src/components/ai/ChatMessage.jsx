import React from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ChatMessage = ({ message, isUser, timestamp }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-600' : 'bg-purple-600'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message */}
        <div className={`rounded-lg p-4 ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
        }`}>
          <div className="whitespace-pre-wrap text-sm">{message}</div>
          
          {/* Timestamp & Actions */}
          <div className="flex items-center justify-end mt-2 space-x-2">
            <span className={`text-xs ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
              {timestamp}
            </span>
            {!isUser && (
              <button
                onClick={handleCopy}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  isUser ? 'text-blue-200' : 'text-gray-400'
                }`}
                title="Copy message"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
