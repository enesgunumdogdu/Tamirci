import { NextRequest, NextResponse } from 'next/server'
import { classifyText } from '../../lib/monkeylearn'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      )
    }

    const isTech = await classifyText(text)
    
    return NextResponse.json({ 
      isTech,
      message: isTech 
        ? 'Text classified as technical'
        : 'Text classified as non-technical'
    })
  } catch (error) {
    console.error('Classification error:', error)
    return NextResponse.json(
      { error: 'Classification failed' },
      { status: 500 }
    )
  }
}