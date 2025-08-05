export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export interface ChatResponse {
  message: string
  isTech: boolean
}

export interface ClassificationResult {
  isTech: boolean
  confidence?: number
}