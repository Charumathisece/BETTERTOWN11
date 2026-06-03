import { useState, useEffect } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Alert,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Visibility,
  PictureAsPdf,
  Timeline,
  FilterList,
  Clear,
} from '@mui/icons-material';

function ViewStatus() {
  const { issues } = useIssues();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [allFormattedComplaints, setAllFormattedComplaints] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  // Initialize formatted complaints from real context data
  useEffect(() => {
    if (issues) {
      const formatted = issues.map(issue => ({
        id: issue.complaintId,
        category: issue.category,
        location: issue.location?.address || 'N/A',
        status: issue.status,
        date: issue.createdAt ? format(new Date(issue.createdAt), 'yyyy-MM-dd') : 'N/A',
      }));
      setAllFormattedComplaints(formatted);
      if (!searchQuery) {
        setFilteredComplaints(formatted);
      }
    }
  }, [issues]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Pending':
        return 'error';
      default:
        return 'default';
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    
    // If search query is cleared, reset to show all complaints
    if (e.target.value === '') {
      setFilteredComplaints(allFormattedComplaints);
      setSearchPerformed(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredComplaints(allFormattedComplaints);
      setSearchPerformed(false);
      return;
    }
    
    setIsSearching(true);
    setSearchPerformed(true);
    
    // Simulate search delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      
      const results = allFormattedComplaints.filter(complaint => 
        (complaint.id && complaint.id.toLowerCase().includes(query)) || 
        (complaint.location && complaint.location.toLowerCase().includes(query)) ||
        (complaint.category && complaint.category.toLowerCase().includes(query))
      );
      
      setFilteredComplaints(results);
      setIsSearching(false);
    }, 500);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredComplaints(allFormattedComplaints);
    setSearchPerformed(false);
  };

  // Handle Enter key press in search field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
              View Complaint Status
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Track and monitor your reported issues
            </Typography>
          </Box>

          {/* Search Section */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search by Complaint ID or Location"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton 
                        edge="end" 
                        onClick={handleClearSearch}
                        size="small"
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                disabled={isSearching}
                sx={{
                  height: '56px',
                  bgcolor: '#8B0000',
                  '&:hover': {
                    bgcolor: '#600000',
                  },
                }}
              >
                {isSearching ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Search'
                )}
              </Button>
            </Grid>
          </Grid>

          {/* Search Results Info */}
          {searchPerformed && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {filteredComplaints.length === 0 
                  ? 'No complaints found matching your search criteria.' 
                  : `Found ${filteredComplaints.length} complaint${filteredComplaints.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                }
              </Typography>
            </Box>
          )}

          {/* Complaints Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f0f0f0', fontWeight: 'bold' }}>
                  <TableCell>Complaint ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <TableRow 
                      key={complaint.id}
                      sx={{
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell>{complaint.id}</TableCell>
                      <TableCell>{complaint.category}</TableCell>
                      <TableCell>{complaint.location}</TableCell>
                      <TableCell>
                        <Chip
                          label={complaint.status}
                          color={getStatusColor(complaint.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{complaint.date}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Search sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                          No complaints found matching your search criteria
                        </Typography>
                        {searchQuery && (
                          <Button 
                            variant="text" 
                            color="primary" 
                            onClick={handleClearSearch}
                            sx={{ mt: 1 }}
                          >
                            Clear Search
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
            Need Help?
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • For any queries, contact our helpdesk at 1800-XXX-XXXX
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • Email us at support@bettertown.gov.in
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ViewStatus;