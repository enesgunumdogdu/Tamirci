import { NextRequest, NextResponse } from 'next/server'
import { generateChatResponse, ChatMessage } from '../../lib/openai'
import { classifyText } from '../../lib/monkeylearn'

const NON_TECH_RESPONSE = 'I am Tamirci technical assistant, developed to answer only technical questions. If you think I made an error and your question is technical, please try asking it differently.'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const isTech = await classifyText(message)
    
    if (!isTech) {
      return NextResponse.json({
        message: NON_TECH_RESPONSE,
        isTech: false
      })
    }

    const messages: ChatMessage[] = [
      ...conversationHistory,
      { role: 'user', content: message }
    ]
    
    const response = await generateChatResponse(messages)
    
    return NextResponse.json({
      message: response,
      isTech: true
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Chat request failed' },
      { status: 500 }
    )
  }
}