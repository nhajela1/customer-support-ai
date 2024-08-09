'use client'
import { useState, useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)

  
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
    }

    setIsLoading(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center p-6'>

      <div className='flex w-full items-center justify-end'>
        <Button>
          Admin Dashboard
        </Button>        
      </div>

      <section className='flex flex-col border border-black w-[500px] h-[700px] p-2 gap-3'>
        <ul className='flex flex-col gap-4 overflow-y-auto max-h-full flex-grow list-none m-0 p-0'>
          {messages.map((message, index) => (
            <li
              key={index}
              className={cn("flex", message.role === 'assistant' ? 'justify-start' : 'justify-end')}
            >
              <div
                className={cn('p-6 text-white rounded-[50px]', message.role === 'assistant'
                  ? 'bg-blue-500'
                  : 'bg-purple-500')}
              >
                {message.content}
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
        <div className='flex gap-2 items-center w-full'>
          <Input
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      </section>
    </main>
  )
}