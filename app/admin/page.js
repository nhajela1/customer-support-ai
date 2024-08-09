'use client'

import { useState } from 'react'
import { Box, Button, TextField, Typography, Container, ThemeProvider } from '@mui/material'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar'
import theme from '../styles/theme';
import { upload } from '@/action/upload'

export default function AdminDashboard() {
  const [description, setDescription] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [file, setFile] = useState(null)
  const router = useRouter()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault()

    // Check if a file has been selected
    if (!file) {
      console.error('No file selected')
      return
    }

    // Check if a company name has been entered
    if (companyName === '') {
      console.error('Company name is required')
      return
    }

    // Upload the file
    const formData = new FormData()
    formData.append('file', file)
    const fileURL = await upload(formData)

    // Set the company name and file URL in the database
    const companyID = companyName.trim().toLowerCase().replace(/\s+/g, '-')
    const databaseResponse = await fetch('/api/set-company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyID, companyName, fileURL }),
    })

    // Set the system prompt
    await fetch('/api/set-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })

    // Generate a high-quality system prompt
    const sysPromptResponse = await fetch('/api/generate-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

  if (databaseResponse.ok) {
    console.log('File uploaded and company data stored successfully')
      if (sysPromptResponse.ok) {
        console.log('System prompt generated successfully')
        const data = await response.json();
      const generatedPrompt = data.prompt;

      // Set the generated system prompt
      const setPromptResponse = await fetch('/api/set-system-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: generatedPrompt }),
      });

      if (setPromptResponse.ok) {
        router.push('/chat');
      } else {
        console.error('Failed to set system prompt');
      }
      } else {
        console.error('Failed to generate system prompt');
      }
    } else {
      console.error('Failed to upload file or store company data')
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