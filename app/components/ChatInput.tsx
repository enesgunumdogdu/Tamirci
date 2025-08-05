'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!message.trim() || disabled) return
    
    onSendMessage(message.trim())
    setMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your technical question..."
        className="flex-1 min-h-[48px] max-h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        disabled={disabled}
        rows={1}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        <Send size={18} />
        Send
      </button>
    </form>
  )
}