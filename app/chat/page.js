'use client'

import { Container, Box, Button, Stack, TextField, ThemeProvider } from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import theme from '../styles/theme';
import Navbar from '../../components/navbar';
import { auth } from '../../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firestore } from '../../utils/firebase';
import { collection, addDoc, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

export default function ChatPage() {

  const searchParams = useSearchParams();
  const companyID = searchParams.get('companyID');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm a support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [userEmail, setUserEmail] = useState(''); // State to hold user email
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoggedIn(!!user);
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.isAdmin || false);
        }
        fetchUserMessages(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserMessages = async (userId) => {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.messages && userData.messages.length > 0) {
        setMessages(userData.messages);
      } else {
        setMessages([
          {
            role: 'assistant',
            content: "Hi! I'm a support assistant. How can I help you today?",
          },
        ]);
      }
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);
    setMessage('');
    const newUserMessage = { role: 'user', content: message };
    setMessages((prevMessages) => [...prevMessages, newUserMessage, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyID, messages: [...messages, newUserMessage] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        assistantResponse += text;
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = { 
            role: 'assistant', 
            content: assistantResponse 
          };
          return updatedMessages;
        });
      }

      await appendMessagesToFirestore(newUserMessage, { role: 'assistant', content: assistantResponse });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ]);
    }

    setIsLoading(false);
  };

  const appendMessagesToFirestore = async (userMessage, assistantMessage) => {
    if (!auth.currentUser) return;

    const userRef = doc(firestore, 'users', auth.currentUser.uid);
    const userDoc = await getDoc(userRef);

    const updatedMessages = userDoc.exists()
      ? [...userDoc.data().messages, userMessage, assistantMessage]
      : [userMessage, assistantMessage];

    await setDoc(userRef, {
      email: auth.currentUser.email,
      messages: updatedMessages,
    }, { merge: true });

    setMessages(updatedMessages);
  };

  const clearMessages = async () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm a support assistant. How can I help you today?",
      },
    ]);

    if (auth.currentUser) {
      try {
        const userRef = doc(firestore, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
          messages: [],
        }, { merge: true });
        console.log('Messages cleared successfully');
      } catch (error) {
        console.error('Error clearing messages:', error);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/'); // Redirect to the landing page after signing out
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const handleSignUp = () => {
    router.push(`/signup?companyID=${companyID}`);
  };

  return (

    <ThemeProvider theme={theme}>

      <Navbar />

      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        p={8}
      >
        {isLoggedIn && isAdmin && (
          <Button
            variant="contained"
            onClick={() => router.push('/admin')}
            sx={{ mr: 2 }}
          >
            Admin Dashboard
          </Button>
        )}
        <Button
          variant="contained"
          onClick={clearMessages}
        >
          Clear Chat
        </Button>
        {!isLoggedIn && (
          <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{ ml: 2 }}
          >
            Sign Up to Save Messages
          </Button>
        )}
      </Box>


      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Stack
          direction={'column'}
          width="500px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
        >
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color="white"
                  borderRadius={16}
                  p={3}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  )
}