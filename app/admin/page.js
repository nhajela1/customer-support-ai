'use client'

import { useState } from 'react'
import { Box, Button, TextField, Typography, Container, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar'
import theme from '../styles/theme';
import { upload } from '@/action/upload'
import { auth, firestore } from '@/utils/firebase'
import { updateDoc, doc } from 'firebase/firestore'

export default function AdminDashboard() {
  const [description, setDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [file, setFile] = useState(null)
  const router = useRouter()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file || companyName === '') {
      console.error('File and company name are required')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    const fileURL = await upload(formData)

    const companyID = companyName.trim().toLowerCase().replace(/\s+/g, '-')
    
    // Set the company data
    const databaseResponse = await fetch('/api/set-company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyID, companyName, fileURL }),
    })

    if (!databaseResponse.ok) {
      console.error('Failed to store company data')
      return
    }

    // Associate the company ID with the current user
    const user = auth.currentUser;
    if (!user) {
      console.error('No user is currently signed in');
      return;
    }

    try {
      await updateDoc(doc(firestore, "users", user.uid), {
        companyID: companyID
      });
      console.log('Company ID associated with user successfully');
    } catch (error) {
      console.error('Failed to associate company with user:', error);
      return;
    }

    // Generate a high-quality system prompt
    const sysPromptResponse = await fetch('/api/generate-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    if (!sysPromptResponse.ok) {
      console.error('Failed to generate system prompt')
      return
    }

    const { prompt: generatedPrompt } = await sysPromptResponse.json();

    // Set the generated system prompt for the company
    const setPromptResponse = await fetch('/api/set-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyID, systemPrompt: generatedPrompt }),
    });

    if (setPromptResponse.ok) {
      console.log('Company data stored and system prompt set successfully')
      router.push('/chat');
    } else {
      console.error('Failed to set system prompt');
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Navbar />
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Company Name"
          sx={{ mb: 2 }}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Company Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mb: 2 }}
        >
          Upload Document
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {file && <Typography sx={{ mb: 2 }}>{file.name}</Typography>}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
    </ThemeProvider>
  )
}