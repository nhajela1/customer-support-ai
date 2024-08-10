'use client'

import { useState, useRef, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container, ThemeProvider, Snackbar, Switch, FormControlLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import theme from '../styles/theme';
import { upload } from '@/action/upload';
import { auth, firestore } from '@/utils/firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [file, setFile] = useState(null);
  const [userLink, setUserLink] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [companyID, setCompanyID] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [showSystemPrompt, setShowSystemPrompt] = useState(false);
  const [initialSystemPrompt, setInitialSystemPrompt] = useState('');
  const router = useRouter();
  const linkRef = useRef(null);
  const [snackbarMessage, setSnackbarMessage] = useState("Operation completed successfully");

  const handleCompanyNameChange = (e) => {
    const newCompanyName = e.target.value;
    setCompanyName(newCompanyName);
    const newCompanyID = newCompanyName.trim().toLowerCase().replace(/\s+/g, '-');
    generateUserLink(newCompanyID);
  };

  useEffect(() => {
    if (companyID) {
      generateUserLink(companyID);
    }
  }, [companyID]);

  const generateUserLink = (id) => {
    const link = `${window.location.origin}/chat?companyID=${id}`;
    setUserLink(link);
  };

  useEffect(() => {
    console.log('Fetching company data...');
    const fetchCompanyData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.companyID) {
            setCompanyID(userData.companyID);
            const response = await fetch(`/api/get-company?companyID=${userData.companyID}`);
            if (response.ok) {
              const companyData = await response.json();
              console.log('Company data fetched:', companyData);
              setCompanyName(companyData.companyName || '');
              setDescription(companyData.description || '');
              setSystemPrompt(companyData.systemPrompt || '');
              setInitialSystemPrompt(companyData.systemPrompt || '');
              if (companyData.fileURL) {
                setFile({ name: 'Existing document', url: companyData.fileURL });
              }
              generateUserLink(userData.companyID);
            }
          }
        }
      }
    };

    fetchCompanyData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const updateCompanyDetails = async () => {
    if (!companyName) {
      console.error('Company name is required');
      return false;
    }

    let fileURL = null;
    if (file instanceof File) {
      const formData = new FormData();
      formData.append('file', file);
      fileURL = await upload(formData);
    } else if (file && file.url) {
      fileURL = file.url;
    }

    const updatedCompanyID = companyID || companyName.trim().toLowerCase().replace(/\s+/g, '-');
    
    const databaseResponse = await fetch('/api/set-company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        companyID: updatedCompanyID, 
        companyName, 
        fileURL, 
        description,
        systemPrompt
      }),
    });

    if (!databaseResponse.ok) {
      console.error('Failed to update company data');
      return false;
    }

    if (!companyID) {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user is currently signed in');
        return false;
      }

      try {
        await updateDoc(doc(firestore, "users", user.uid), {
          companyID: updatedCompanyID
        });
        console.log('Company ID associated with user successfully');
        setCompanyID(updatedCompanyID);
      } catch (error) {
        console.error('Failed to associate company with user:', error);
        return false;
      }
    }

    setCompanyID(updatedCompanyID);
    return updatedCompanyID;
  };

  const generateSystemPrompt = async () => {
    if (!description) {
      console.error('Company description is required to generate system prompt');
      return null;
    }

    const sysPromptResponse = await fetch('/api/generate-system-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });

    if (!sysPromptResponse.ok) {
      console.error('Failed to generate system prompt');
      return null;
    }

    const { prompt: generatedPrompt } = await sysPromptResponse.json();
    console.log("System prompt generated:", generatedPrompt);
    return generatedPrompt;
  };

  const updateSystemPrompt = async (prompt) => {
    if (!prompt) {
      console.error('System prompt is empty. This should not happen.');
      return false;
    }

    if (!companyID) {
      console.error('Company ID is missing. This should not happen.');
      return false;
    }

    console.log('Attempting to set system prompt:', { companyID, systemPrompt: prompt });

    try {
      const setPromptResponse = await fetch('/api/set-system-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyID, systemPrompt: prompt }),
      });

      if (!setPromptResponse.ok) {
        const errorData = await setPromptResponse.json();
        console.error('Failed to set system prompt:', setPromptResponse.status, errorData);
        return false;
      }

      console.log('System prompt set successfully');
      return true;
    } catch (error) {
      console.error('Error setting system prompt:', error);
      return false;
    }
  };

  const handleFirstTimeSubmit = async () => {
    try {
      const updatedCompanyID = await updateCompanyDetails();
      if (!updatedCompanyID) {
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to update company details");
        return;
      }
      setCompanyID(updatedCompanyID);
      console.log("Company details updated successfully");

      const generatedPrompt = await generateSystemPrompt();
      if (!generatedPrompt) {
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to generate system prompt");
        return;
      }
      setSystemPrompt(generatedPrompt);
      setShowSystemPrompt(true);
      console.log("System prompt generated successfully");

      const promptSet = await updateSystemPrompt(generatedPrompt);
      if (!promptSet) {
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to set system prompt");
        return;
      }
      console.log("System prompt set successfully");

      if (!companyID) {
        console.error("CompanyID is not set. Cannot route to chat.");
        setOpenSnackbar(true);
        setSnackbarMessage("Error: Company ID not set");
        return;
      }

      setOpenSnackbar(true);
      setSnackbarMessage("Company setup completed successfully");
      console.log("Attempting to route to:", `/chat?companyID=${companyID}`);
      
      await router.push(`/chat?companyID=${companyID}`);
    } catch (error) {
      console.error("Error in handleFirstTimeSubmit:", error);
      setOpenSnackbar(true);
      setSnackbarMessage("An error occurred during setup");
    }
  };

  const handleUpdateCompanyAndSetPrompt = async () => {
    const companyUpdated = await updateCompanyDetails();
    if (!companyUpdated) return;

    if (systemPrompt !== initialSystemPrompt) {
      const promptSet = await updateSystemPrompt();
      if (!promptSet) return;
    }

    setOpenSnackbar(true);
  };

  const handleGenerateAndSetPrompt = async () => {
    const promptGenerated = await generateSystemPrompt();
    if (!promptGenerated) return;

    const promptSet = await updateSystemPrompt(promptGenerated);
    if (!promptSet) return;

    setOpenSnackbar(true);
  };

  const copyToClipboard = () => {
    if (linkRef.current) {
      linkRef.current.select();
      document.execCommand('copy');
      setOpenSnackbar(true);
    }
  };

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
            onChange={handleCompanyNameChange}
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
          {!systemPrompt ? (
            <Button
              fullWidth
              variant="contained"
              onClick={handleFirstTimeSubmit}
              sx={{ mb: 2 }}
            >
              Submit
            </Button>
          ) : (
            <>
              <Button
                fullWidth
                variant="contained"
                onClick={handleUpdateCompanyAndSetPrompt}
                sx={{ mb: 2 }}
              >
                Update Company Details
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleGenerateAndSetPrompt}
                sx={{ mb: 2 }}
              >
                Generate New System Prompt
              </Button>
            </>
          )}
          {systemPrompt && (
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showSystemPrompt}
                    onChange={(e) => setShowSystemPrompt(e.target.checked)}
                  />
                }
                label="Show System Prompt"
              />
              {showSystemPrompt && (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  label="System Prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  sx={{ mt: 2, mb: 2 }}
                />
              )}
            </Box>
          )}
          {userLink && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">User Link:</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={userLink}
                InputProps={{
                  readOnly: true,
                }}
                inputRef={linkRef}
              />
              <Button
                variant="contained"
                onClick={copyToClipboard}
                sx={{ mt: 1 }}
              >
                Copy Link
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  )
}