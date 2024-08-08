import { NextResponse } from 'next/server'

let systemPrompt = "You are a helpful assistant that can answer questions and help with tasks. You are friendly and helpful."

export async function POST(req) {
  const data = await req.json()
  systemPrompt = data.description
  return NextResponse.json({ success: true })
}

export function getSystemPrompt() {
  return systemPrompt
}