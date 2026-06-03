import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Divider,
  Snackbar,
  Alert,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn 
} from '@mui/icons-material';

const ContactInfo = ({ icon, title, content, link }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        mb: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        }
      }}
    >
      <Box 
        sx={{ 
          mr: 2, 
          bgcolor: '#8B0000', 
          color: 'white', 
          borderRadius: '50%', 
          width: 50, 
          height: 50, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 'bold' }}>
          {title}
        </Typography>
        {link ? (
          <Typography 
            component="a" 
            href={link} 
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: '#8B0000',
                textDecoration: 'underline'
              }
            }}
          >
            {content}
          </Typography>
        ) : (
          <Typography sx={{ color: 'text.secondary' }}>
            {content}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const SocialButton = ({ icon, link, name }) => {
  return (
    <Button
      variant="contained"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={icon}
      sx={{
        mr: 1,
        mb: 1,
        bgcolor: '#8B0000',
        '&:hover': {
          bgcolor: '#600000',
          transform: 'translateY(-3px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      {name}
    </Button>
  );
};

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          transform: expanded ? 'none' : 'translateY(-3px)'
        }
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {question}
          <Box 
            sx={{ 
              fontSize: '1.5rem', 
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            ▼
          </Box>
        </Typography>
        {expanded && (
          <Typography 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              animation: 'fadeIn 0.5s ease'
            }}
          >
            {answer}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

function ContactUs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to a server here
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields correctly.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const faqs = [
    {
      question: "How do I report an issue in my area?",
      answer: "You can report an issue by clicking on the 'Report Issue' button on our homepage. Fill in the required details, add photos if available, and submit the form. Our team will review and forward it to the relevant authorities."
    },
    {
      question: "How long does it take to resolve reported issues?",
      answer: "Resolution time varies depending on the nature and complexity of the issue. Minor issues may be resolved within a few days, while more complex problems might take several weeks. You can track the status of your reported issue through your account dashboard."
    },
    {
      question: "Can I track the status of my reported issue?",
      answer: "Yes, you can track the status of your reported issue by logging into your account and navigating to the 'My Reports' section. There, you'll find real-time updates on all your reported issues."
    },
    {
      question: "How do I create an account on BetterTown?",
      answer: "To create an account, click on the 'Register' button in the top navigation bar. Fill in your details, verify your email address, and you're all set to start using our services."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your information with third parties without your explicit consent."
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#FFFFFF', 
          color: '#333', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
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
            }}
          >
            Contact Us
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              maxWidth: '800px', 
              mx: 'auto', 
              textAlign: 'center' 
            }}
          >
            Have questions or feedback? We're here to help improve your community.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: '16px', 
            overflow: 'hidden',
            mb: 8
          }}
        >
          <Grid container>
            {/* Contact Information */}
            <Grid 
              item 
              xs={12} 
              md={5} 
              sx={{ 
                bgcolor: '#f5f5f5',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: 'bold',
                    color: '#333',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: '60px',
                      height: '4px',
                      backgroundColor: '#8B0000',
                      borderRadius: '2px'
                    }
                  }}
                >
                  Get In Touch
                </Typography>

                <ContactInfo 
                  icon={<Phone />} 
                  title="Phone" 
                  content="+91 9597487409"
                  link="tel:+919597487409"
                />
                
                <ContactInfo 
                  icon={<Email />} 
                  title="Email" 
                  content="contact@bettertown.org"
                  link="mailto:contact@bettertown.org"
                />
                
                <ContactInfo 
                  icon={<LocationOn />} 
                  title="Address" 
                  content="123 Civic Center, Anna Salai, Chennai, Tamil Nadu 600002, India"
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <SocialButton 
                    icon={<Facebook />} 
                    link="https://facebook.com" 
                    name="Facebook" 
                  />
                  <SocialButton 
                    icon={<Twitter />} 
                    link="https://twitter.com" 
                    name="Twitter" 
                  />
                  <SocialButton 
                    icon={<Instagram />} 
                    link="https://instagram.com" 
                    name="Instagram" 
                  />
                  <SocialButton 
                    icon={<LinkedIn />} 
                    link="https://linkedin.com" 
                    name="LinkedIn" 
                  />
                </Box>
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7} sx={{ p: 4 }}>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'bold',
                  color: '#333',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#8B0000',
                    borderRadius: '2px'
                  }
                }}
              >
                Send Us a Message
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      sx={{
                        bgcolor: '#8B0000',
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
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>

        {/* FAQ Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333',
              position: 'relative',
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
            Frequently Asked Questions
          </Typography>
          
          <Box sx={{ mt: 6 }}>
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer} 
              />
            ))}
          </Box>
        </Box>

        {/* Map Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333',
              position: 'relative',
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
            Find Us
          </Typography>
          
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: '16px', 
              overflow: 'hidden',
              height: '400px',
              position: 'relative'
            }}
          >
            <Box 
              component="iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9285454913!2d80.24515261482214!3d13.044542990805624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ed15c41b63%3A0x905c9987fb4aedc!2sAnna%20Salai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1649930945628!5m2!1sen!2sin"
              sx={{
                border: 0,
                width: '100%',
                height: '100%'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
        </Box>

        {/* Office Hours */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333',
              position: 'relative',
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
            Office Hours
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: '16px',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#8B0000' }}>
                  Weekdays
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Monday - Friday</Typography>
                  <Typography variant="body1">9:00 AM - 6:00 PM</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Our customer service team is available during these hours to assist you with any inquiries or issues.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: '16px',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#8B0000' }}>
                  Weekends
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Saturday</Typography>
                  <Typography variant="body1">10:00 AM - 4:00 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sunday</Typography>
                  <Typography variant="body1">Closed</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  For emergencies during non-office hours, please use our 24/7 helpline at +91 44 2345 6789.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ContactUs;
