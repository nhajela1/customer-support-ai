import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.resolve('systemPrompt.txt')

export async function POST(req) {
  const data = await req.json()
  fs.writeFileSync(filePath, data.description, 'utf8')
  console.log('System prompt set to:', data.description) // Add logging
  return NextResponse.json({ success: true })
}

export function getSystemPrompt() {
  const systemPrompt = fs.readFileSync(filePath, 'utf8')
  console.log('Returning system prompt:', systemPrompt) // Add logging
  return systemPrompt
}