import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  Card, 
  CardContent, 
  CardMedia,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedbackIcon from '@mui/icons-material/Feedback';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';

function AdminLanding() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Hero slider images and content
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Welcome to BetterTown Admin",
      subtitle: "Manage your city with powerful tools and real-time insights"
    },
    {
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      title: "Data-Driven Decisions",
      subtitle: "Access analytics and reports to improve community services"
    },
    {
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Citizen Engagement",
      subtitle: "Respond to feedback and build a better community together"
    }
  ];

  // Feature cards content
  const featureCards = [
    { 
      title: 'Manage Issues', 
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#2E7D32' }} />, 
      path: '/admin/issues',
      description: 'Review and manage reported community issues. Update status and assign to departments.',
      color: '#E8F5E9',
      iconBg: '#2E7D32'
    },
    { 
      title: 'Data Visualization', 
      icon: <BarChartIcon sx={{ fontSize: 40, color: '#1565C0' }} />, 
      path: '/admin/visualization',
      description: 'View comprehensive analytics and statistics about reported issues and resolution rates.',
      color: '#E3F2FD',
      iconBg: '#1565C0'
    },
    { 
      title: 'Feedback Management', 
      icon: <FeedbackIcon sx={{ fontSize: 40, color: '#6A1B9A' }} />, 
      path: '/admin/feedback',
      description: 'Review citizen feedback and suggestions to improve community services.',
      color: '#F3E5F5',
      iconBg: '#6A1B9A'
    }
  ];

  // Stats data
  const statsData = [
    { label: 'Issues Resolved', value: '1,234', icon: <AssignmentTurnedInIcon />, color: '#2E7D32' },
    { label: 'Citizen Feedback', value: '856', icon: <FeedbackIcon />, color: '#6A1B9A' },
    { label: 'Active Users', value: '5,678', icon: <GroupsIcon />, color: '#1565C0' }
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange('next');
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleSlideChange = (direction) => {
    setFadeIn(false);
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
      }
      setFadeIn(true);
    }, 400);
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', 
      minHeight: '100vh',
      pb: 8 
    }}>
      {/* Hero Section with Image Slider */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '60vh', md: '70vh' },
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
      >
        {/* Slider Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${heroSlides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'opacity 0.4s ease-in-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
              zIndex: 1
            }
          }}
        />
        
        {/* Slider Navigation */}
        <Box sx={{ position: 'absolute', bottom: 20, width: '100%', zIndex: 3, display: 'flex', justifyContent: 'center' }}>
          {heroSlides.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                mx: 1,
                bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>
        
        {/* Slider Arrows */}
        <IconButton
          sx={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            zIndex: 2,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            display: { xs: 'none', md: 'flex' }
          }}
          onClick={() => handleSlideChange('prev')}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <IconButton
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            zIndex: 2,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
            display: { xs: 'none', md: 'flex' }
          }}
          onClick={() => handleSlideChange('next')}
        >
          <ArrowForwardIcon />
        </IconButton>
        
        {/* Slider Content */}
        <Fade in={fadeIn} timeout={800}>
          <Container 
            maxWidth="lg" 
            sx={{ 
              position: 'relative', 
              zIndex: 2, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              color: 'white',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
              <Typography 
                variant="h2" 
                fontWeight="bold" 
                sx={{ 
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                {heroSlides[currentSlide].title}
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                  opacity: 0.9
                }}
              >
                {heroSlides[currentSlide].subtitle}
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={() => handleNavigation('/admin/login')}
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#388E3C' },
                  padding: '12px 35px',
                  fontSize: '1.1rem',
                  borderRadius: '30px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  textTransform: 'none'
                }}
              >
                Get Started
              </Button>
            </Box>
          </Container>
        </Fade>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -5, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          {statsData.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'white',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  height: '100%'
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: stat.color, 
                    width: 60, 
                    height: 60, 
                    mb: 2,
                    boxShadow: `0 4px 12px ${stat.color}50`
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h3" fontWeight="bold" color="text.primary">
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Welcome Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Admin Dashboard"
                style={{ 
                  width: '100%', 
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}
              />
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: -20, 
                  right: -20, 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(46, 125, 50, 0.3)',
                  display: { xs: 'none', md: 'flex' }
                }}
              >
                <DashboardIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              sx={{ 
                color: '#333',
                mb: 3,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Welcome to Your<br />
              <Box component="span" sx={{ color: '#4CAF50' }}>Admin Dashboard</Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}>
              The BetterTown Admin Portal provides powerful tools to manage civic issues, 
              analyze data, and respond to community feedback. Our intuitive interface helps 
              you make data-driven decisions to improve your community.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: '#E8F5E9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <SecurityIcon sx={{ color: '#2E7D32' }} />
                </Box>
                <Typography variant="subtitle1" fontWeight="medium">Secure Access</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%', 
                  bgcolor: '#E3F2FD', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <BarChartIcon sx={{ color: '#1565C0' }} />
                </Box>
                <Typography variant="subtitle1" fontWeight="medium">Real-time Analytics</Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              size="large"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => handleNavigation('/admin/login')}
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#388E3C' },
                padding: '12px 35px',
                fontSize: '1.1rem',
                borderRadius: '30px',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                transition: 'all 0.3s ease',
                textTransform: 'none'
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            sx={{ color: '#333', mb: 2 }}
          >
            Administrative Tools
          </Typography>
          <Divider sx={{ width: '80px', mx: 'auto', borderColor: '#4CAF50', borderWidth: 2, mb: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Access these powerful tools to manage community issues and gain valuable insights
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                  },
                  cursor: 'pointer',
                  bgcolor: card.color
                }}
                onClick={() => handleNavigation(card.path)}
              >
                <Box sx={{ p: 4, display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{ 
                      bgcolor: card.iconBg, 
                      width: 60, 
                      height: 60,
                      boxShadow: `0 4px 12px ${card.iconBg}50`
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" sx={{ ml: 2 }}>
                    {card.title}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {card.description}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-end',
                    color: card.iconBg
                  }}>
                    <Typography variant="button" sx={{ mr: 1, fontWeight: 'bold' }}>
                      Access
                    </Typography>
                    <KeyboardArrowRightIcon fontSize="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Paper 
          elevation={4} 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            opacity: 0.05,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")'
          }} />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Access your admin dashboard and start managing your community today
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => handleNavigation('/admin/login')}
              sx={{
                bgcolor: 'white',
                color: '#2E7D32',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                padding: '12px 35px',
                fontSize: '1.1rem',
                borderRadius: '30px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Get Started
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Footer Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 10, 
        pt: 4, 
        pb: 4, 
        bgcolor: 'rgba(0,0,0,0.03)'
      }}>
        <Container>
          <Typography variant="body2" color="text.secondary">
            BetterTown Administration Portal • Secure Access Only
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {new Date().getFullYear()} BetterTown Municipal Corporation
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default AdminLanding;
