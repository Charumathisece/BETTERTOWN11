import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIssues } from '../../context/IssueContext';
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Button,
  IconButton,
  Divider,
  Chip,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import NotesIcon from '@mui/icons-material/Notes';
import PlaceIcon from '@mui/icons-material/Place'; // For Landmark
import FingerprintIcon from '@mui/icons-material/Fingerprint'; // For Complaint ID
import { format } from 'date-fns'; // For date formatting

// Define API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://bettertown.onrender.com/api';

const IssueDetail = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { updateIssueStatus } = useIssues();
  const [newStatus, setNewStatus] = useState('');
  const [adminFeedback, setAdminFeedback] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'info' });

  // Function to fetch issue details
  const fetchIssueDetails = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token'); // Get admin token

    if (!token) {
      setError('Authentication required. Please log in as admin.');
      setLoading(false);
      // Optionally redirect to login
      // navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/issues/${issueId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIssue(data);
      setNewStatus(data.status);
      setAdminFeedback(data.adminFeedback || '');
    } catch (err) {
      console.error("Error fetching issue details:", err);
      setError(err.message || 'Failed to load issue details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (issueId) {
      fetchIssueDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueId]); // Re-fetch if issueId changes

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'In Progress': return 'info';
      case 'Resolved': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleUpdateIssue = async () => {
    setUpdateLoading(true);
    const result = await updateIssueStatus(issue._id, newStatus, adminFeedback);
    setUpdateLoading(false);
    
    if (result.success) {
      setAlertInfo({ show: true, message: 'Issue updated successfully', severity: 'success' });
      // Update local issue object to reflect changes immediately
      setIssue(prev => ({ ...prev, status: newStatus, adminFeedback }));
    } else {
      setAlertInfo({ show: true, message: result.error || 'Failed to update issue', severity: 'error' });
    }
  };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!issue) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">Issue not found.</Alert>
         <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  // --- Render Issue Details ---
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" fontWeight="bold" color="#800000">
            Issue Details
          </Typography>
          <Chip 
             label={issue.status}
             color={getStatusColor(issue.status)}
             size="medium"
             sx={{ ml: 'auto', fontWeight: 'bold' }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Left Column: Details List */}
          <Grid item xs={12} md={7}>
            <List dense>
              <ListItem>
                <ListItemIcon><FingerprintIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Complaint ID" secondary={issue.complaintId || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Reported By" secondary={issue.reportedBy?.email || issue.reportedBy?.name || 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemIcon><CalendarTodayIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Date Reported" secondary={issue.createdAt ? format(new Date(issue.createdAt), 'PPPppp') : 'N/A'} />
              </ListItem>
              <ListItem>
                <ListItemIcon><CategoryIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Category" secondary={issue.category} />
              </ListItem>
              <ListItem>
                <ListItemIcon><LocationOnIcon color="primary" /></ListItemIcon>
                <ListItemText 
                    primary="Location Address"
                    secondary={issue.location?.address || 'N/A'} 
                />
                {/* Optional: Display coordinates or map link here */}
                {/* {issue.location?.coordinates && <Typography variant="caption">({issue.location.coordinates.join(', ')})</Typography>} */}
              </ListItem>
              {issue.landmark && (
                <ListItem>
                  <ListItemIcon><PlaceIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Nearest Landmark" secondary={issue.landmark} />
                </ListItem>
              )}
              <ListItem alignItems="flex-start">
                <ListItemIcon sx={{ mt: 1 }}><NotesIcon color="primary" /></ListItemIcon>
                <ListItemText 
                    primary="Description" 
                    secondary={issue.description} 
                    secondaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }} // Preserve formatting
                />
              </ListItem>
              {/* TODO: Add Section for Status Update and Admin Feedback */}
            </List>
          </Grid>

          {/* Right Column: Photos */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>Photos</Typography>
            {issue.photos && issue.photos.length > 0 ? (
              <Grid container spacing={2}>
                {issue.photos.map((photoUrl, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        // IMPORTANT: Ensure photoUrl is a valid image source.
                        // If you stored filenames, prepend the base URL or use a service URL.
                        image={photoUrl} 
                        alt={`Issue photo ${index + 1}`}
                        sx={{ 
                           aspectRatio: '1 / 1', // Make images square
                           objectFit: 'cover' 
                        }}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="textSecondary">No photos uploaded.</Typography>
            )}
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mt: 3, p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">Admin Actions</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newStatus}
                  label="Status"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Admin Feedback"
                multiline
                rows={2}
                value={adminFeedback}
                onChange={(e) => setAdminFeedback(e.target.value)}
                placeholder="Add notes or feedback for the citizen..."
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleUpdateIssue}
                disabled={updateLoading}
                startIcon={updateLoading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {updateLoading ? 'Updating...' : 'Update Issue Status'}
              </Button>
            </Grid>
          </Grid>
        </Box>
        
      </Paper>
      
      <Snackbar 
        open={alertInfo.show} 
        autoHideDuration={6000} 
        onClose={() => setAlertInfo({ ...alertInfo, show: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setAlertInfo({ ...alertInfo, show: false })} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default IssueDetail;
