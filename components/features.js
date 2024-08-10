import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CloudIcon from '@mui/icons-material/Cloud';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';



export default function Features() {


  const features = [
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'Blazing Fast',
      description: 'Lorem ipsum dolor amet consectetur adipiscing elit.',
    },
    {
      icon: <CloudIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'SaaS Focused',
      description: 'Lorem ipsum dolor amet consectetur adipiscing elit.',
    },
    {
      icon: <BrushIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'Clean Design',
      description: 'Lorem ipsum dolor amet consectetur adipiscing elit.',
    },
    {
      icon: <CodeIcon sx={{ fontSize: 50, color: '#1a73e8' }} />,
      title: 'Bootstrap 5',
      description: 'Lorem ipsum dolor amet consectetur adipiscing elit.',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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