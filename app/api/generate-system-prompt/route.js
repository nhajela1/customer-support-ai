import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req) {
  const openai = new OpenAI()
  const data = await req.json()

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an AI assistant tasked with creating high-quality system prompts for customer support chatbots. Your goal is to create a prompt that will help the chatbot provide accurate and helpful responses to customer inquiries.' },
      { role: 'user', content: `Create a system prompt for a customer support chatbot for the following company: ${data.description}` }
    ],
    model: 'gpt-4o-mini',
  })

  const generatedPrompt = completion.choices[0].message.content

  // Set the generated prompt as the new system prompt
  const response = await fetch('http://localhost:3000/api/set-system-prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: generatedPrompt }),
  })

  if (response.ok) {
    return NextResponse.json({ success: true, prompt: generatedPrompt })
  } else {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}