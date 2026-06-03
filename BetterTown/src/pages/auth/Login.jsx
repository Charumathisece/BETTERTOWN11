import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Divider,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle, Lock } from "@mui/icons-material";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "", // This will be sent as emailOrPhone
    password: "",
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Make handleSubmit async
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Keep basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setSuccess(''); // Clear success message
      return;
    }

    // Clear previous messages
    setError('');
    setSuccess('');

    const loginData = {
      emailOrPhone: formData.username, // Map username to emailOrPhone
      password: formData.password,
    };

    try {
      // Send POST request to the backend login endpoint
      const res = await axios.post(`${API_URL}/auth/login`, loginData);

      // Handle success (status 200 OK)
      if (res.status === 200 && res.data.token) {
        // Store the token
        localStorage.setItem('token', res.data.token);
        login(res.data.token);
        window.dispatchEvent(new Event('auth-change'));

        // Set success message
        setSuccess('Login successful! Redirecting...');

        // Redirect after a delay
        setTimeout(() => {
          navigate('/'); // Redirect to home page or dashboard
        }, 1500);

      } else {
        // Handle unexpected success response
        setError('Login failed. Please try again.');
      }

    } catch (err) {
      // Handle errors
      if (err.response && err.response.data && err.response.data.msg) {
        // Display error message from backend (e.g., "Invalid Credentials")
        setError(err.response.data.msg);
      } else if (err.request) {
        // Network error
        console.error('Network Error:', err.request);
        setError('Network error. Please check your connection or if the server is running.');
      } else {
        // Other errors
        console.error('Error:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: 10,
        pb: 8,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Left side - Login Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderTop: "4px solid #8B0000",
              }}
            >
              <Box sx={{ mb: 4, textAlign: "center" }}>
                {/* Logo Image */}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiblIR3fnzNIFr77_Wm96HONRN7YTEfsRt1A&s"
                  alt="Citizen Portal Logo"
                  style={{ width: "120px", height: "auto", marginBottom: "15px" }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    mt: 2,
                    color: "#8B0000",
                    fontWeight: "bold",
                  }}
                >
                  Citizen Login Portal
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                  Access your account to track and report civic issues
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username / Email"
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <AccountCircle sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <Lock sx={{ mr: 1, color: "action.active" }} />
                        ),
                      }}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      sx={{
                        bgcolor: "#8B0000",
                        "&:hover": {
                          bgcolor: "#600000",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              {success && (
                <Typography variant="body2" color="success" sx={{ mt: 2 }}>
                  {success}
                </Typography>
              )}

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" color="textSecondary">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    style={{ color: "#8B0000", textDecoration: "none" }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Right side - Information */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                bgcolor: "#8B0000",
                color: "white",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Important Information
              </Typography>
              <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 2 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" paragraph>
                  • Please ensure your password is at least 8 characters long
                </Typography>
                <Typography variant="body2" paragraph>
                  • For security reasons, logout after completing your session
                </Typography>
                <Typography variant="body2" paragraph>
                  • Do not share your login credentials with anyone
                </Typography>
              </Box>
              <Alert
                severity="info"
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "& .MuiAlert-icon": {
                    color: "#8B0000",
                  },
                }}
              >
                For technical support, please contact our helpdesk at 1800-XXX-XXXX
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
