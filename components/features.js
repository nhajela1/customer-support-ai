import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CloudIcon from '@mui/icons-material/Cloud';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';



export default function Features() {


  const features = [
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'AI-Powered Query Resolution',
      description: 'The AI chatbot resolves customer queries in real-time using natural language processing.',
    },
    {
      icon: <CloudIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'Personalized Responses',
      description: 'The chatbot provides responses tailored to individual customer needs based on past interactions.',
    },
    {
      icon: <BrushIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: '24/7 Availability',
      description: 'The AI chatbot is available around the clock, ensuring immediate customer support.',
    },
    {
      icon: <CodeIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'Customizable Chatbot',
      description: 'Companies can tailor the chatbot’s tone and style to match their brand identity.',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                textAlign: 'center',
                p: 2,
                backgroundColor: '#ffffff',
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom color="black">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="black">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}