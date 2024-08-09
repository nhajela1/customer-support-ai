'use client'

import { useRef, useState } from 'react'
import { Box, TextField, Typography, Container } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CornerDownLeft, Paperclip, X } from 'lucide-react'

export default function AdminDashboard() {
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null)


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target?.files![0], "hello")
    setFile(event.target?.files![0])
  }

  const handleSubmit = async () => {
    // Set the system prompt
    await fetch('/api/set-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })

    // Generate a high-quality system prompt
    const response = await fetch('/api/generate-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })

    if (response.ok) {
      router.push('/')
    } else {
      console.error('Failed to generate system prompt')
    }
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Company Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mb-3'
          />

          {
            !file ? 
            <Input
              type="file"
              onChange={handleFileChange}
            />
            :
            <div className='flex items-center justify-between w-full border border-input rounded-md px-2 py-0.5'>
              <p>{file.name}</p>
              <Button 
                onClick={() => setFile(null)} 
                variant="ghost" size="icon"
              >
                <X className='h-4 w-4'/>
              </Button>
            </div>
          }  

        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}