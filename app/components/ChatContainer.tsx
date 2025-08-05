'use client'

import { useState, useEffect, useRef } from 'react'
import { Message } from '../types'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Bot, Wrench } from 'lucide-react'

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am Tamirci, your technical support assistant. I can help you with technical issues. How can I assist you?',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

          setMessages((prev: Message[]) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const conversationHistory = messages
        .filter((msg: Message) => msg.role !== 'system')
        .map((msg: Message) => ({ role: msg.role, content: msg.content }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationHistory
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred')
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }

      setMessages((prev: Message[]) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, an error occurred. Please try again.',
        timestamp: new Date()
      }

      setMessages((prev: Message[]) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chat-container bg-gray-50">
      <header className="flex items-center gap-3 p-6 bg-white border-b">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Wrench className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tamirci</h1>
          <p className="text-gray-600">Technical Support Assistant</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message: Message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="message-bubble bot-message">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-primary" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  )
}