import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, CircularProgress, Tabs, Tab, Chip } from '@mui/material';
import { useIssues } from '../context/IssueContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const AdminDashboard = () => {
  const { issues, loading, updateIssueStatus } = useIssues();
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'In Progress': return 'info';
      case 'Resolved': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const filteredIssues = () => {
    const currentStatus = tabIndex === 0 ? 'Pending' : tabIndex === 1 ? 'In Progress' : tabIndex === 2 ? 'Resolved' : 'Rejected';
    return issues.filter((issue) => issue.status === currentStatus);
  };

  const handleViewDetail = (issueId) => {
    navigate(`/admin/issues/${issueId}`);
  };

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh', pb: 4 }}>
      <Container maxWidth="lg" sx={{ mt: 4, p: 2, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="#800000" align="center" gutterBottom>
          Admin Issue Management
        </Typography>

        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Pending" />
          <Tab label="In Progress" />
          <Tab label="Resolved" />
          <Tab label="Rejected" />
        </Tabs>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {filteredIssues().length === 0 ? (
              <Typography sx={{m: 4, width: '100%', textAlign: 'center'}} color="textSecondary">
                No issues found in this category.
              </Typography>
            ) : (
              filteredIssues().map((issue) => (
                <Grid item xs={12} sm={6} md={4} key={issue._id}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 2 }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
                        <Typography variant="overline" color="textSecondary">{issue.complaintId || 'No ID'}</Typography>
                        <Chip label={issue.status} color={getStatusColor(issue.status)} size="small" />
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{issue.category}</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Reported by: {issue.reportedBy?.email || 'N/A'}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1, mb: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
                        {issue.description}
                      </Typography>
                      <Typography variant="caption" display="block" color="textSecondary">
                        Reported on: {issue.createdAt ? format(new Date(issue.createdAt), 'PPpp') : 'N/A'}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2, mt: 'auto' }}>
                      <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => handleViewDetail(issue._id)}
                        sx={{ ml: 'auto' }}
                      >
                        View in Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default AdminDashboard;
