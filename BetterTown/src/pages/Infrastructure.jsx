import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Divider, 
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  CheckCircle, 
  Engineering, 
  WaterDrop, 
  Lightbulb, 
  DirectionsRailway, 
  Park, 
  Construction,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const InfrastructureProject = ({ title, description, image, status, completion }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: '12px', 
        overflow: 'hidden',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 1
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            {title}
          </Typography>
          <Box 
            sx={{ 
              bgcolor: status === 'Completed' ? '#4caf50' : 
                      status === 'In Progress' ? '#ff9800' : '#2196f3',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}
          >
            {status}
          </Box>
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        
        {completion && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Completion: {completion}%
            </Typography>
            <Box 
              sx={{ 
                width: '100%', 
                height: '8px', 
                bgcolor: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <Box 
                sx={{ 
                  width: `${completion}%`, 
                  height: '100%', 
                  bgcolor: completion === 100 ? '#4caf50' : 
                          completion >= 50 ? '#ff9800' : '#2196f3',
                  transition: 'width 1s ease-in-out'
                }}
              />
            </Box>
          </Box>
        )}
      </CardContent>
    </Paper>
  );
};

function Infrastructure() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Road Improvement Project",
      description: "Upgrading major roads with new asphalt, proper drainage systems, and street lighting to improve traffic flow and safety.",
      image: "https://www.constructionweekonline.com/cloud/2021/11/08/Road-construction-1.jpg",
      status: "In Progress",
      completion: 65
    },
    {
      title: "Water Supply Enhancement",
      description: "Expanding the water distribution network and upgrading treatment facilities to ensure clean water access for all neighborhoods.",
      image: "https://www.waterworld.com/content/dam/ww/print-articles/2018/01/1801wwdom-F2.jpg",
      status: "In Progress",
      completion: 40
    },
    {
      title: "Smart Street Lighting",
      description: "Installing energy-efficient LED street lights with smart controls to reduce energy consumption and improve visibility.",
      image: "https://www.ledsmagazine.com/content/dam/leds/print-articles/volume-15/issue-1/1801LEDSFea_1.jpg",
      status: "Completed",
      completion: 100
    },
    {
      title: "Public Park Renovation",
      description: "Revitalizing community parks with new playgrounds, walking paths, and green spaces for recreation and community gatherings.",
      image: "https://www.nrpa.org/contentassets/f768428a39aa4035ae55b2aaff372617/inclusion-playground.jpg",
      status: "Planning",
      completion: 10
    },
    {
      title: "Metro Rail Extension",
      description: "Extending the metro rail network to connect more neighborhoods and reduce traffic congestion in the city center.",
      image: "https://static.toiimg.com/thumb/msid-67898476,width-1200,height-900,resizemode-4/.jpg",
      status: "In Progress",
      completion: 30
    },
    {
      title: "Sewage Treatment Upgrade",
      description: "Modernizing sewage treatment plants to improve capacity and ensure environmentally friendly waste management.",
      image: "https://www.wateronline.com/ext/resources/WOL/2018/01/sewage-treatment-plant.jpg?1516305252",
      status: "Completed",
      completion: 100
    }
  ];

  const benefits = [
    {
      icon: <Engineering />,
      title: "Modern Infrastructure",
      description: "State-of-the-art facilities designed with the latest technology and engineering standards."
    },
    {
      icon: <WaterDrop />,
      title: "Clean Water Access",
      description: "Improved water supply systems ensuring clean, safe water for all residents."
    },
    {
      icon: <Lightbulb />,
      title: "Energy Efficiency",
      description: "Smart lighting and energy-efficient systems reducing environmental impact and costs."
    },
    {
      icon: <DirectionsRailway />,
      title: "Better Connectivity",
      description: "Enhanced transportation networks connecting all parts of the city efficiently."
    },
    {
      icon: <Park />,
      title: "Green Spaces",
      description: "More parks and recreational areas for community wellness and environmental benefits."
    },
    {
      icon: <Construction />,
      title: "Economic Growth",
      description: "Infrastructure development creating jobs and stimulating local economic growth."
    }
  ];

  return (
    <Box sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#8B0000', 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-white-shapes-background_79603-1362.jpg?w=1380&t=st=1712403245~exp=1712403845~hmac=c5c7d9f0b7f78a9e72a3d064822e80f72b308b7a5b8f3d3a2b650c5c0771d2a9")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Better Infrastructure
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              maxWidth: '800px', 
              mx: 'auto', 
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Working together to build modern, sustainable, and efficient public facilities for everyone.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Introduction Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              color: '#333',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#8B0000',
                borderRadius: '2px'
              }
            }}
          >
            Building a Better Future
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
            BetterTown is committed to developing and maintaining high-quality infrastructure that serves the needs of all citizens. Our infrastructure initiatives focus on creating sustainable, accessible, and modern facilities that improve quality of life while respecting the environment.
          </Typography>
        </Box>

        {/* Current Projects Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333'
            }}
          >
            Current Infrastructure Projects
          </Typography>
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <InfrastructureProject {...project} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333'
            }}
          >
            Benefits of Infrastructure Development
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: '#8B0000'
                      }}
                    >
                      {benefit.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          ml: 1, 
                          fontWeight: 'bold'
                        }}
                      >
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Community Impact Section */}
        <Box sx={{ mb: 8 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 3, 
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center'
              }}
            >
              Community Impact
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Our infrastructure projects are designed with community needs at the forefront. We believe that well-planned infrastructure not only improves daily life but also creates opportunities for economic growth and social development.
            </Typography>
            <List>
              {[
                "Reduced travel time and improved safety with better roads",
                "Enhanced quality of life with reliable utilities and services",
                "Increased property values in areas with improved infrastructure",
                "More recreational opportunities with parks and public spaces",
                "Reduced environmental impact through sustainable design"
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: '#8B0000' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            p: 4,
            borderRadius: '12px',
            bgcolor: '#f5f5f5'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Get Involved
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            We welcome community input on infrastructure projects. Your feedback helps us ensure that our developments meet the real needs of residents and create lasting positive impact.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/contact')}
            sx={{
              bgcolor: '#8B0000',
              color: 'white',
              py: 1.5,
              px: 4,
              '&:hover': {
                bgcolor: '#600000',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Share Your Ideas
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Infrastructure;
