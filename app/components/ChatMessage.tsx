'use client'

import { Message } from '@/app/types'

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`message-bubble ${isUser ? 'user-message' : 'bot-message'}`}>
        <div className="flex items-start gap-2">
          {!isUser && (
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              T
            </div>
          )}
          <div className="flex-1">
            <p className="whitespace-pre-wrap">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {message.timestamp.toLocaleTimeString('en-US')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}