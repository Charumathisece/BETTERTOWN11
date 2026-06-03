import { useState } from 'react';
import { useIssues } from '../../context/IssueContext';
import { format } from 'date-fns';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Alert,
} from '@mui/material';
import { Search, Timeline } from '@mui/icons-material';

function TrackApplication() {
  const [applicationId, setApplicationId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackedIssue, setTrackedIssue] = useState(null);
  const { issues, loading } = useIssues();
  const [searchError, setSearchError] = useState('');

  // Mock data for demonstration
  const handleTrack = () => {
    setSearchError('');
    if (applicationId) {
      const foundIssue = issues.find(i => i.complaintId === applicationId);
      if (foundIssue) {
        setTrackedIssue(foundIssue);
        setIsTracking(true);
      } else {
        setSearchError('Issue not found. Please check the Complaint ID.');
        setIsTracking(false);
      }
    }
  };

  const generateTimeline = (issue) => {
    const statuses = ['Pending', 'In Progress', 'Resolved'];
    const currentIdx = statuses.indexOf(issue.status) !== -1 ? statuses.indexOf(issue.status) : 0;
    
    // Add rejection handling
    if (issue.status === 'Rejected') {
      return [
        {
          label: 'Application Submitted',
          description: 'Your complaint was registered.',
          date: issue.createdAt ? format(new Date(issue.createdAt), 'dd MMM yyyy, hh:mm a') : 'N/A',
          status: 'completed',
        },
        {
          label: 'Rejected',
          description: `Complaint rejected. Reason: ${issue.adminFeedback || 'N/A'}`,
          date: issue.updatedAt ? format(new Date(issue.updatedAt), 'dd MMM yyyy, hh:mm a') : 'N/A',
          status: 'error',
        }
      ];
    }
    
    return [
      {
        label: 'Application Submitted',
        description: 'Your complaint has been successfully registered.',
        date: issue.createdAt ? format(new Date(issue.createdAt), 'dd MMM yyyy, hh:mm a') : 'N/A',
        status: currentIdx >= 0 ? 'completed' : 'pending',
      },
      {
        label: 'In Progress',
        description: 'Complaint is being reviewed and worked on.',
        date: currentIdx >= 1 && issue.updatedAt ? format(new Date(issue.updatedAt), 'dd MMM yyyy, hh:mm a') : 'Pending',
        status: currentIdx > 1 ? 'completed' : (currentIdx === 1 ? 'active' : 'pending'),
      },
      {
        label: 'Resolution',
        description: issue.adminFeedback || 'Issue resolution and closure.',
        date: currentIdx >= 2 && issue.updatedAt ? format(new Date(issue.updatedAt), 'dd MMM yyyy, hh:mm a') : 'Pending',
        status: currentIdx >= 2 ? 'completed' : 'pending',
      },
    ];
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 10,
        pb: 8,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderTop: '4px solid #8B0000',
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: '#8B0000',
                fontWeight: 'bold',
              }}
            >
              Track Application Status
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Enter your application ID to track its current status
            </Typography>
          </Box>

          {/* Search Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Enter Application ID"
                variant="outlined"
                placeholder="e.g., COMP2024001"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                error={!!searchError}
                helperText={searchError}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleTrack}
                sx={{
                  height: '56px',
                  bgcolor: 'government.main',
                  '&:hover': {
                    bgcolor: 'government.dark',
                  },
                }}
              >
                Track Status
              </Button>
            </Grid>
          </Grid>

          {isTracking && (
            <>
              <Divider sx={{ my: 4 }} />
              
              {/* Application Details */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, bgcolor: '#f8f8f8' }}>
                    <Typography variant="h6" gutterBottom>
                      Application Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">ID:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{trackedIssue.complaintId}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">Category:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{trackedIssue.category}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="textSecondary">Location:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{trackedIssue.location?.address}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Alert
                    severity={trackedIssue.status === 'Resolved' ? 'success' : (trackedIssue.status === 'Rejected' ? 'error' : 'info')}
                    sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
                  >
                    <Typography>
                      Current Status: <strong>{trackedIssue.status}</strong>
                      {trackedIssue.adminFeedback && (
                        <>
                          <br /><br />
                          Feedback: <strong>{trackedIssue.adminFeedback}</strong>
                        </>
                      )}
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>

              {/* Timeline */}
              <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Timeline /> Application Timeline
                </Typography>
                <Stepper orientation="vertical">
                  {generateTimeline(trackedIssue).map((step, index) => (
                    <Step
                      key={step.label}
                      active={step.status === 'active'}
                      completed={step.status === 'completed' || step.status === 'error'}
                    >
                      <StepLabel error={step.status === 'error'}>
                        <Typography variant="subtitle1" color={step.status === 'error' ? 'error' : 'inherit'}>{step.label}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {step.date}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography color={step.status === 'error' ? 'error' : 'inherit'}>{step.description}</Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </>
          )}
        </Paper>

        {/* Help Section */}
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            p: 3,
            bgcolor: '#8B0000',
            color: 'white',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Need Assistance?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • Contact our 24/7 helpdesk at 1800-XXX-XXXX
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • Average resolution time: 7-10 working days
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default TrackApplication; 