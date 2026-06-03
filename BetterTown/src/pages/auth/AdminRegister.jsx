import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Fade,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  AdminPanelSettings, 
  Lock, 
  Person,
  Security,
  VerifiedUser,
  Assignment
} from '@mui/icons-material';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (!username || !password) {
      setError('Username and password are required.');
      setIsLoading(false);
      return;
    }

    // --- Mock Registration (Replace with backend API) ---
    console.log('Attempting to register admin:', username);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === 'existingadmin') {
      setError('Username already taken.');
      setIsLoading(false);
    } else {
      setSuccess('Registration successful! Redirecting to dashboard...');
      // Store authentication status
      localStorage.setItem('isAdminAuthenticated', 'true');
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <Box sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(139, 0, 0, 0.05) 100%)',
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(139, 0, 0, 0.05) 100%)',
        zIndex: 0
      }} />

      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #8B0000 0%, #600000 100%)',
          py: 2,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 6 },
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROb86eO3dYK9jiJ5j3bHIP-KBak7UtMAhu0Hjr_Numqoh3beA-u7pk71nF9ILgyoTvegY&usqp=CAU"
            alt="Tamil Nadu Flag"
            sx={{
              width: 50,
              height: 50,
              bgcolor: 'white',
              p: 0.5,
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          />
          <Typography variant="h5" sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
          }}>
            BetterTown
          </Typography>
        </Box>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          <Button 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Home
          </Button>
          <Button 
            component={RouterLink} 
            to="/admin/login" 
            sx={{ 
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Registration Form */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                  background: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '4px', 
                  background: 'linear-gradient(90deg, #8B0000 0%, #600000 100%)' 
                }} />
                
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    mx: 'auto', 
                    mb: 2, 
                    bgcolor: '#8B0000', 
                    width: 60, 
                    height: 60,
                    boxShadow: '0 4px 12px rgba(139, 0, 0, 0.4)'
                  }}>
                    <AdminPanelSettings fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#8B0000">
                    Admin Registration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Credentials are usually provided by the government
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                {error && (
                  <Fade in={!!error}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  </Fade>
                )}
                
                {success && (
                  <Fade in={!!success}>
                    <Alert severity="success" sx={{ mb: 3 }}>
                      {success}
                    </Alert>
                  </Fade>
                )}
                
                <Box component="form" onSubmit={handleRegister} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Assigned Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!error && !success}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Assigned Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error && !success}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!error && !success}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleToggleConfirmPasswordVisibility}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, mb: 2 }}>
                    <Button
                      component={RouterLink}
                      to="/admin/login"
                      variant="outlined"
                      sx={{
                        py: 1.5,
                        borderColor: '#8B0000',
                        color: '#8B0000',
                        '&:hover': { borderColor: '#600000', bgcolor: 'rgba(139, 0, 0, 0.05)' },
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'medium',
                        width: '45%'
                      }}
                    >
                      Back to Login
                    </Button>
                    
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isLoading}
                      sx={{ 
                        py: 1.5, 
                        bgcolor: '#8B0000', 
                        '&:hover': { bgcolor: '#600000' },
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        width: '45%'
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Register'
                      )}
                    </Button>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Already have an account?
                    </Typography>
                    <Link 
                      component={RouterLink} 
                      to="/admin/login" 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        color: '#8B0000',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Sign in here
                    </Link>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
          
          {/* Right Side - Information */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ pl: 4 }}>
              <Typography variant="h4" fontWeight="bold" color="#8B0000" gutterBottom>
                Join the <Box component="span" sx={{ color: '#8B0000' }}>Admin Team</Box>
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Register with your government-issued credentials to access the administrative dashboard and help manage community issues effectively.
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { 
                    icon: <VerifiedUser sx={{ color: '#8B0000' }} />, 
                    title: 'Secure Access', 
                    description: 'Your account is protected with advanced security measures' 
                  },
                  { 
                    icon: <Assignment sx={{ color: '#8B0000' }} />, 
                    title: 'Issue Management', 
                    description: 'Track and resolve community issues efficiently' 
                  },
                  { 
                    icon: <Security sx={{ color: '#8B0000' }} />, 
                    title: 'Administrative Tools', 
                    description: 'Access powerful tools to serve your community better' 
                  }
                ].map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Card sx={{ 
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                      }
                    }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'rgba(139, 0, 0, 0.1)' }}>
                          {item.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Footer */}
      <Box 
        sx={{ 
          py: 3, 
          bgcolor: 'rgba(0,0,0,0.02)', 
          borderTop: '1px solid rgba(0,0,0,0.05)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
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

export default AdminRegister;
