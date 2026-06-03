import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  Tab,
  Tabs,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  Rating,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError(null);

      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${API_URL}/feedback`, config);
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(err.response?.data?.message || 'Failed to fetch feedback. You may not have admin privileges.');
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [token]);

  useEffect(() => {
    let result = feedbackList;

    if (searchTerm) {
      result = result.filter(
        (feedback) =>
          feedback.feedbackText.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          feedback.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFeedback(result);
  }, [searchTerm, feedbackList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = (event, feedback) => {
    setAnchorEl(event.currentTarget);
    setSelectedFeedback(feedback);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFeedback(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ 
          color: '#8B0000', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <SearchIcon sx={{ mr: 1, fontSize: '2rem' }} /> User Feedback Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage feedback submitted by citizens through the BetterTown platform.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search feedback..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: '300px' }}
        />
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      )}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      )}
      {!loading && !error && (
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {filteredFeedback.length > 0 ? (
            <List disablePadding>
              {filteredFeedback.map((feedback, index) => (
                <React.Fragment key={feedback._id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="more"
                        onClick={(e) => handleMenuClick(e, feedback)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    sx={{
                        py: 2,
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.03)'
                        }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 50, mt: 0.5 }}>
                      <Avatar sx={{ bgcolor: '#8B0000' }}>
                        {feedback.user?.name ? feedback.user.name[0].toUpperCase() : 'U'}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ component: 'div' }}
                      secondaryTypographyProps={{ component: 'div' }}
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="subtitle1" fontWeight="medium" sx={{ mr: 1 }}>
                            {feedback.user?.name || 'Anonymous User'}
                          </Typography>
                          {feedback.rating && feedback.rating > 0 && (
                              <Rating
                                name={`rating-${feedback._id}`}
                                value={feedback.rating}
                                readOnly
                                precision={0.5} 
                                size="small"
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                sx={{ ml: 1 }}
                              />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            sx={{ 
                              display: 'block', 
                              mb: 1,
                              whiteSpace: 'pre-wrap' 
                            }}
                          >
                            {feedback.feedbackText}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {feedback.user?.email || 'No email'} • {new Date(feedback.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  {index < filteredFeedback.length - 1 && <Divider component="li" variant="inset" />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', p: 5 }}>
              <SearchIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No feedback found
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                {searchTerm ? 'Try adjusting your search or filters' : 'No feedback has been submitted yet'}
              </Typography>
              {searchTerm && (
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              )}
            </Box>
          )}
        </Paper>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} disabled>View Details (soon)</MenuItem>
      </Menu>
    </Container>
  );
}

export default AdminFeedback;
