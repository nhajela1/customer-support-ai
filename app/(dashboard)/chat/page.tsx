'use client'

import { Container, Box, Stack, TextField, ThemeProvider } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import theme from '../../styles/theme';
import Navbar from '../../../components/navbar';
import { auth } from '../../../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Send, ThumbsUp, Pencil } from 'lucide-react';

export default function LandingPage() {

  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [userEmail, setUserEmail] = useState(''); // State to hold user email

  useEffect(() => {
    // Fetch the current user's email and UID
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user?.email!);
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

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

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader?.read() as { done: any, value: any }
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

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/'); // Redirect to the landing page after signing out
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const handleAdminDashboard = () => {
    router.push('/admin');
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <main className='flex flex-col items-center'>
      {
        /*
        
        <Button
          type="submit"
          variant="contained"
          onClick={handleAdminDashboard}
        >
          Admin Dashboard
        </Button>
        
        */
      }
      <div className='flex flex-col w-full md:w-3/5 h-[85dvh] p-3 gap-3'>
        <ul className='flex flex-col gap-2 flex-grow overflow-auto max-h-full'>
          {messages.map((message, index) => (
            <li
              key={index}
              className={cn("grid grid-cols-[_7%_auto_7%] gap-1 items-center")}
            >
              <Avatar>
                <AvatarImage 
                  src={message.role === "assistant" ? 
                    "https://api.dicebear.com/9.x/shapes/svg?seed=Sasha" : 
                    "https://api.dicebear.com/9.x/adventurer/svg?seed=You&backgroundColor=b6e3f4"
                  }
                />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div
                //color="white"
                //borderRadius={16}
                //p={3}
              >
                <p className="text-lg font-semibold">{message.role === 'assistant' ? 'ChatAI' : 'You'}</p>
                <p>{message.content}</p>
              </div>
              <div>
                {
                  message.role === "assistant" ? 
                  <Button variant="ghost" size="icon">
                    <ThumbsUp/>
                  </Button>
                  :
                  <Button variant="ghost" size="icon">
                    <Pencil/>
                  </Button>
                }
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>

        <div className="grid grid-cols-[_auto_10%] gap-2 items-center w-full h-12">
          <Input
            placeholder="Enter your question here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full h-full"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading}
            size="icon"
            className="disabled:brightness-50 h-12 w-12 aspect-square"
          >
            {<Send className="h-4 w-4"/>}
          </Button>
        </div>
      </div>
      
    </main>
  )
}