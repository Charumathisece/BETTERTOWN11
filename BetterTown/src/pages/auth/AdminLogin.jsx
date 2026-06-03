import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
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
  Dashboard,
  Settings
} from '@mui/icons-material';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone: username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || data.message || 'Invalid credentials.');
      }

      // Safely decode the JWT (handle base64url formatting)
      const base64Url = data.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      
      if (payload.user && payload.user.isAdmin) {
        localStorage.setItem('token', data.token);
        login(data.token);
        window.dispatchEvent(new Event('auth-change'));
        navigate('/admin/dashboard');
      } else {
        setError('Access denied: You are not authorized as an administrator.');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        background: 'linear-gradient(135deg, rgba(88, 35, 35, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
        zIndex: 0
      }} />

      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(90deg,rgb(116, 41, 41) 0%,rgb(125, 46, 46) 100%)',
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
              '&:hover': { bgcolor: 'rgba(100, 37, 37, 0.1)' }
            }}
          >
            Home
          </Button>
          <Button 
            component={RouterLink} 
            to="/admin/register" 
            sx={{ 
              color: 'white',
              '&:hover': { bgcolor: 'rgba(100, 37, 37, 0.1)' }
            }}
          >
            Register
          </Button>
          <Button 
            component={RouterLink} 
            to="/contact" 
            sx={{ 
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Contact
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Login Form */}
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
                  background: 'linear-gradient(90deg,rgb(83, 37, 27) 0%,rgb(114, 57, 55) 100%)' 
                }} />
                
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Avatar sx={{ 
                    mx: 'auto', 
                    mb: 2, 
                    bgcolor: '#8B0000', 
                    width: 60, 
                    height: 60,
                    boxShadow: '0 4px 12px rgba(165, 48, 39, 0.4)'
                  }}>
                    <AdminPanelSettings fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#8B0000">
                    Admin Login
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Secure access to the administrative dashboard
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
                
                <Box component="form" onSubmit={handleLogin} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!error}
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
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
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
                  />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1, mb: 3 }}>
                    <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ color: '#8B0000' }}>
                      Forgot password?
                    </Link>
                  </Box>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{ 
                      py: 1.5, 
                      bgcolor: '#8B0000', 
                      '&:hover': { bgcolor: '#600000' },
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                  
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have admin credentials?
                    </Typography>
                    <Link 
                      component={RouterLink} 
                      to="/admin/register" 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium',
                        color: '#8B0000',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Register here
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
                Welcome to the <Box component="span" sx={{ color: '#8B0000' }}>Admin Portal</Box>
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Access powerful administrative tools to manage civic issues, analyze data, and respond to community feedback.
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { 
                    icon: <Dashboard sx={{ color: '#8B0000' }} />, 
                    title: 'Dashboard Access', 
                    description: 'View real-time statistics and analytics' 
                  },
                  { 
                    icon: <Security sx={{ color: '#8B0000' }} />, 
                    title: 'Secure Management', 
                    description: 'Safely manage user accounts and permissions' 
                  },
                  { 
                    icon: <Settings sx={{ color: '#8B0000' }} />, 
                    title: 'System Configuration', 
                    description: 'Configure system settings and preferences' 
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

export default AdminLogin;
