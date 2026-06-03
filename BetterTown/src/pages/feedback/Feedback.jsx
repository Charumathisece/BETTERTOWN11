import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Rating,
  Snackbar,
  Alert,
  MenuItem,
  Divider,
  Card,
  CardContent,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const API_URL = import.meta.env.VITE_API_URL || 'https://bettertown.onrender.com/api';

// Custom styled components
const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: '#8B0000',
  },
  '& .MuiRating-iconHover': {
    color: '#600000',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
}));

const FeedbackTypeCard = styled(Card)(({ theme, selected }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  transform: selected ? 'scale(1.05)' : 'scale(1)',
  border: selected ? `2px solid #8B0000` : 'none',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

function Feedback() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    rating: 0,
    message: '',
  });
  
  const [selectedType, setSelectedType] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const feedbackTypes = [
    { value: 'suggestion', label: 'Suggestion', icon: <EmojiEmotionsIcon sx={{ fontSize: 40 }} /> },
    { value: 'complaint', label: 'Complaint', icon: <SentimentDissatisfiedIcon sx={{ fontSize: 40 }} /> },
    { value: 'appreciation', label: 'Appreciation', icon: <ThumbUpIcon sx={{ fontSize: 40 }} /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setFormData({
      ...formData,
      feedbackType: type,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setSnackbar({
        open: true,
        message: 'You must be logged in to submit feedback.',
        severity: 'error',
      });
      return;
    }

    if (!formData.message) {
        setSnackbar({
          open: true,
          message: 'Feedback message cannot be empty.',
          severity: 'warning',
        });
        return;
      }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const body = JSON.stringify({
        feedbackText: formData.message,
        rating: formData.rating > 0 ? formData.rating : undefined,
      });

      const res = await axios.post(`${API_URL}/feedback`, body, config);

      if (res.status === 201) {
        setSnackbar({
          open: true,
          message: 'Thank you for your feedback! We appreciate your input.',
          severity: 'success',
        });

        setFormData({
          name: '',
          email: '',
          feedbackType: '',
          rating: 0,
          message: '',
        });
        setSelectedType(null);
      } else {
        setSnackbar({
            open: true,
            message: 'Feedback submitted, but received an unexpected response.',
            severity: 'warning',
          });
      }

    } catch (err) {
      console.error('Feedback submission error:', err.response || err.message);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to submit feedback. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 8,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg,rgb(245, 242, 242) 0%,rgb(248, 244, 244) 100%)',
          py: 6,
          mb: 6,
          color: 'black',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <FeedbackIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            We Value Your Feedback
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
            Your opinions help us improve BetterTown and create a better community experience for everyone.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left side - Feedback Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom color="#8B0000">
                Share Your Thoughts
              </Typography>
              <Divider sx={{ mb: 4 }} />

              <form onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  What type of feedback would you like to provide?
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {feedbackTypes.map((type) => (
                    <Grid item xs={12} sm={4} key={type.value}>
                      <FeedbackTypeCard
                        selected={selectedType === type.value}
                        onClick={() => handleTypeSelect(type.value)}
                      >
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          <Box sx={{ color: selectedType === type.value ? '#8B0000' : 'text.secondary' }}>
                            {type.icon}
                          </Box>
                          <Typography variant="h6" sx={{ mt: 1 }}>
                            {type.label}
                          </Typography>
                        </CardContent>
                      </FeedbackTypeCard>
                    </Grid>
                  ))}
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      required
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Rate your overall experience with BetterTown
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledRating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      size="large"
                      icon={<SentimentSatisfiedAltIcon fontSize="inherit" />}
                      emptyIcon={<SentimentSatisfiedAltIcon fontSize="inherit" />}
                    />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {formData.rating > 0 ? `${formData.rating}/5` : 'Select a rating'}
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  multiline
                  rows={6}
                  placeholder="Please share your detailed feedback, suggestions, or concerns..."
                  sx={{ mb: 4 }}
                />

                <AnimatedButton
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{
                    bgcolor: '#8B0000',
                    '&:hover': { bgcolor: '#600000' },
                    py: 1.5,
                    px: 4,
                    borderRadius: '30px',
                  }}
                >
                  Submit Feedback
                </AnimatedButton>
              </form>
            </Paper>
          </Grid>

          {/* Right side - Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'white',
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom color="#8B0000">
                  Why Your Feedback Matters
                </Typography>
                <Typography variant="body1" paragraph>
                  Your feedback helps us understand what's working well and where we need to improve. We use this information to:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Enhance our civic issue reporting system
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Improve response times for reported issues
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Develop new features that benefit our community
                  </Typography>
                  <Typography component="li" variant="body1">
                    Train our staff to better serve citizens
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'white',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom color="#8B0000">
                  What Happens Next?
                </Typography>
                <Typography variant="body1" paragraph>
                  After submitting your feedback:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: '#8B0000',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      1
                    </Box>
                    <Typography variant="body1">
                      Our team reviews your submission within 48 hours
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: '#8B0000',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      2
                    </Box>
                    <Typography variant="body1">
                      You may receive a follow-up email if we need more information
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: '#8B0000',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      3
                    </Box>
                    <Typography variant="body1">
                      Your feedback is incorporated into our improvement plans
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Feedback;
