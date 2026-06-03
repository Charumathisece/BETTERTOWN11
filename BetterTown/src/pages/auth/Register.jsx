import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    aadhar: '',
    district: '',
    password: '',
    confirmPassword: '',
  });

  const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Tirunelveli'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setSuccess(''); 
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setSuccess(''); 
      return;
    }

    setError('');
    setSuccess('');

    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.mobile, 
      // Note: aadhar and district are not sent to the current backend endpoint
    };

    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);

      if (res.status === 201 && res.data.token) {
        login(res.data.token);

        setSuccess('Registration Successful! Redirecting...');

        setTimeout(() => {
          navigate('/'); 
        }, 1500);
      } else {
        setError('Registration failed. Please try again.');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else if (err.request) {
        console.error('Network Error:', err.request);
        setError('Network error. Please check your connection or if the server is running.');
      } else {
        console.error('Error:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Side: Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderTop: '4px solid rgb(255, 255, 60)' }}>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiblIR3fnzNIFr77_Wm96HONRN7YTEfsRt1A&s"
                  alt="Government Logo"
                  style={{ height: '80px' }}
                />
                <Typography variant="h4" component="h1" sx={{ mt: 2, color: '#8B0000', fontWeight: 'bold' }}>
                  Citizen Registration
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                  Register to access government services and report civic issues
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name (as per Aadhar)"
                      variant="outlined"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      variant="outlined"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Aadhar Number"
                      variant="outlined"
                      required
                      value={formData.aadhar}
                      onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>District</InputLabel>
                      <Select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        label="District"
                        required
                      >
                        {districts.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      sx={{
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#8B0000', textDecoration: 'none' }}>
                    Login here
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right Side: Image */}
          <Grid item xs={12} md={5} display="flex" justifyContent="center" alignItems="center">
            <Box
              component="img"
              src="https://cdn.vectorstock.com/i/2000v/43/54/enchanting-tamil-nadu-india-vector-42714354.avif"
              alt="Tamil Nadu Image"
              sx={{
                width: '100%',
                maxHeight: '100vh',
                objectFit: 'cover',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Register;
