'use client'

import { useState } from 'react'
import { Box, Button, TextField, Typography, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar'

export default function AdminDashboard() {
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const router = useRouter()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async () => {
    // Generate a high-quality system prompt
    const response = await fetch('/api/generate-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    if (response.ok) {
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
  }

  return (
    <>
    <Navbar />
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
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
    </>
  )
}