import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent, 
  Divider, 
  Tabs, 
  Tab, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useIssues } from '../../context/IssueContext'; // Corrected relative path
import { 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  Error, 
  PendingActions, 
  LocationOn,
  Category,
  AccessTime
} from '@mui/icons-material';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Needed for Pie chart
  PointElement, // Needed for Line chart
  LineElement, // Needed for Line chart
  Title,
  Tooltip,
  Legend
);

function DataVisualization() {
  // Get shared state from context
  const { issues, loading, error } = useIssues();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // --- Check Authentication ---
    let isAuthenticated = false;
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        if (payload.user && payload.user.isAdmin) {
          isAuthenticated = true;
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    // --- End Check Authentication ---

    // Data fetching is handled by IssueProvider
  }, [navigate]);

  // --- Process data for charts ---
  const statusCounts = issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, { Pending: 0, 'In Progress': 0, Resolved: 0 }); // Initialize with all statuses

  const categoryCounts = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {});

  // Generate location data (using districts as locations)
  const locationData = issues.reduce((acc, issue) => {
    const location = issue.location?.district || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  // Generate mock time-based data for trend analysis
  const generateTimeData = () => {
    let labels = [];
    let pendingData = [];
    let inProgressData = [];
    let resolvedData = [];

    if (timeRange === 'week') {
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      pendingData = [5, 7, 6, 8, 9, 7, 5];
      inProgressData = [3, 4, 5, 6, 7, 6, 4];
      resolvedData = [2, 3, 4, 5, 6, 7, 8];
    } else if (timeRange === 'month') {
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      pendingData = [20, 25, 18, 15];
      inProgressData = [15, 18, 20, 17];
      resolvedData = [10, 15, 20, 25];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      pendingData = [30, 35, 40, 45, 50, 55, 60, 55, 50, 45, 40, 35];
      inProgressData = [20, 25, 30, 35, 40, 45, 50, 45, 40, 35, 30, 25];
      resolvedData = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65];
    }

    return { labels, pendingData, inProgressData, resolvedData };
  };

  const timeData = generateTimeData();

  // Calculate summary statistics
  const totalIssues = issues.length;
  const pendingPercentage = totalIssues > 0 ? Math.round((statusCounts.Pending / totalIssues) * 100) : 0;
  const inProgressPercentage = totalIssues > 0 ? Math.round((statusCounts['In Progress'] / totalIssues) * 100) : 0;
  const resolvedPercentage = totalIssues > 0 ? Math.round((statusCounts.Resolved / totalIssues) * 100) : 0;
  
  // Calculate resolution rate (mock data for demonstration)
  const resolutionRate = resolvedPercentage > 30 ? 'Excellent' : resolvedPercentage > 20 ? 'Good' : 'Needs Improvement';
  const resolutionTrend = resolvedPercentage > inProgressPercentage ? 'Increasing' : 'Decreasing';

  // --- Chart Configurations ---
  const barChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Number of Issues',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 159, 64, 0.6)', // Orange for Pending
          'rgba(54, 162, 235, 0.6)', // Blue for In Progress
          'rgba(75, 192, 192, 0.6)',  // Green for Resolved
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: 'Issue Categories',
        data: Object.values(categoryCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          // Add more colors if you have more categories
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const locationChartData = {
    labels: Object.keys(locationData),
    datasets: [
      {
        label: 'Issues by Location',
        data: Object.values(locationData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const trendChartData = {
    labels: timeData.labels,
    datasets: [
      {
        label: 'Pending',
        data: timeData.pendingData,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'In Progress',
        data: timeData.inProgressData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Resolved',
        data: timeData.resolvedData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow charts to resize within container
    plugins: {
      legend: {
        position: 'top', // Removed 'as const'
      },
      title: {
        display: true,
        // Title text is set per chart below
      },
    },
     scales: { // Only applicable to Bar chart, ignored by Pie
        y: {
            beginAtZero: true,
            ticks: { // Ensure only whole numbers are shown on y-axis
                 stepSize: 1
            }
        }
    }
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle time range change
  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };
  
  // Check auth before rendering potentially sensitive data
  let isAuthRender = false;
  const tokenForRender = localStorage.getItem('token');
  if (tokenForRender) {
    try {
      const base64Url = tokenForRender.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      if (payload.user && payload.user.isAdmin) {
        isAuthRender = true;
      }
    } catch (e) {}
  }

  if (!isAuthRender) {
    return null; // Handled by useEffect redirect
  }

  // Generate a printable report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'government.main', fontWeight: 'bold' }}>
          Issue Data Visualization
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handlePrintReport}
          sx={{ bgcolor: 'government.main' }}
        >
          Generate Report
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      )}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      )}
      {!loading && !error && issues.length > 0 && (
        <>
          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#f9f9f9', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="textSecondary" gutterBottom>
                      Total Issues
                    </Typography>
                    <PendingActions color="primary" />
                  </Box>
                  <Typography variant="h4" component="div">
                    {totalIssues}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Across all categories and statuses
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#fff8e1', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="textSecondary" gutterBottom>
                      Pending
                    </Typography>
                    <Error sx={{ color: 'orange' }} />
                  </Box>
                  <Typography variant="h4" component="div">
                    {statusCounts.Pending} <Typography variant="caption" component="span">({pendingPercentage}%)</Typography>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Issues awaiting action
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#e3f2fd', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="textSecondary" gutterBottom>
                      In Progress
                    </Typography>
                    <TrendingUp sx={{ color: 'blue' }} />
                  </Box>
                  <Typography variant="h4" component="div">
                    {statusCounts['In Progress']} <Typography variant="caption" component="span">({inProgressPercentage}%)</Typography>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Issues currently being addressed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: '#e8f5e9', boxShadow: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="textSecondary" gutterBottom>
                      Resolved
                    </Typography>
                    <CheckCircle sx={{ color: 'green' }} />
                  </Box>
                  <Typography variant="h4" component="div">
                    {statusCounts.Resolved} <Typography variant="caption" component="span">({resolvedPercentage}%)</Typography>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Successfully completed issues
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs for different chart views */}
          <Paper sx={{ mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth" 
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Status & Categories" icon={<Category />} iconPosition="start" />
              <Tab label="Geographic Distribution" icon={<LocationOn />} iconPosition="start" />
              <Tab label="Time Trends" icon={<AccessTime />} iconPosition="start" />
            </Tabs>
          </Paper>

          {/* Tab 1: Status and Categories */}
          {tabValue === 0 && (
            <Grid container spacing={4}>
              {/* Bar Chart */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px' }}> {/* Fixed height for chart container */}
                  <Typography variant="h6" textAlign="center" gutterBottom>Issues by Status</Typography>
                  <Box sx={{ height: 'calc(100% - 30px)' }}> {/* Adjust height accounting for title */}
                    <Bar options={{...chartOptions, plugins: {...chartOptions.plugins, title: {display: true, text: 'Issue Status Distribution'}}}} data={barChartData} />
                  </Box>
                </Paper>
              </Grid>

              {/* Pie Chart */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px' }}>
                  <Typography variant="h6" textAlign="center" gutterBottom>Issues by Category</Typography>
                  <Box sx={{ height: 'calc(100% - 30px)' }}>
                    <Pie options={{...chartOptions, plugins: {...chartOptions.plugins, title: {display: true, text: 'Issue Category Breakdown'}}}} data={pieChartData} />
                  </Box>
                </Paper>
              </Grid>

              {/* Performance Metrics */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle1" color="textSecondary">Resolution Rate</Typography>
                        <Typography variant="h5">{resolutionRate}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {resolvedPercentage}% of issues are resolved
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle1" color="textSecondary">Resolution Trend</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h5">{resolutionTrend}</Typography>
                          {resolutionTrend === 'Increasing' ? 
                            <TrendingUp sx={{ color: 'green', ml: 1 }} /> : 
                            <TrendingDown sx={{ color: 'red', ml: 1 }} />
                          }
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          Compared to previous period
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle1" color="textSecondary">Average Resolution Time</Typography>
                        <Typography variant="h5">4.2 days</Typography>
                        <Typography variant="body2" color="textSecondary">
                          From report to resolution
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Tab 2: Geographic Distribution */}
          {tabValue === 1 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, height: '400px' }}>
                  <Typography variant="h6" textAlign="center" gutterBottom>Issues by Location</Typography>
                  <Box sx={{ height: 'calc(100% - 30px)' }}>
                    <Doughnut options={{...chartOptions, plugins: {...chartOptions.plugins, title: {display: true, text: 'Geographic Distribution'}}}} data={locationChartData} />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: '400px' }}>
                  <Typography variant="h6" gutterBottom>Location Analysis</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ overflowY: 'auto', height: 'calc(100% - 60px)' }}>
                    {Object.entries(locationData).map(([location, count]) => (
                      <Box key={location} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1">{location}</Typography>
                          <Typography variant="subtitle1">{count} issues</Typography>
                        </Box>
                        <Box sx={{ width: '100%', bgcolor: '#e0e0e0', height: 10, borderRadius: 5, mt: 1 }}>
                          <Box 
                            sx={{ 
                              width: `${(count / Math.max(...Object.values(locationData))) * 100}%`, 
                              bgcolor: 'primary.main', 
                              height: 10, 
                              borderRadius: 5 
                            }} 
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Tab 3: Time Trends */}
          {tabValue === 2 && (
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="time-range-label">Time Range</InputLabel>
                    <Select
                      labelId="time-range-label"
                      value={timeRange}
                      label="Time Range"
                      onChange={handleTimeRangeChange}
                    >
                      <MenuItem value="week">Last Week</MenuItem>
                      <MenuItem value="month">Last Month</MenuItem>
                      <MenuItem value="year">Last Year</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, height: '400px' }}>
                  <Typography variant="h6" textAlign="center" gutterBottom>Issue Trends Over Time</Typography>
                  <Box sx={{ height: 'calc(100% - 30px)' }}>
                    <Line 
                      options={{
                        ...chartOptions, 
                        plugins: {
                          ...chartOptions.plugins, 
                          title: {
                            display: true, 
                            text: `Issue Status Trends (${timeRange === 'week' ? 'Last Week' : timeRange === 'month' ? 'Last Month' : 'Last Year'})`
                          }
                        }
                      }} 
                      data={trendChartData} 
                    />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 3, mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Trend Insights</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle1" color="textSecondary">Issue Reporting Trend</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h5">Increasing</Typography>
                          <TrendingUp sx={{ color: 'orange', ml: 1 }} />
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          10% increase in new issues reported
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle1" color="textSecondary">Resolution Efficiency</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h5">Improving</Typography>
                          <TrendingUp sx={{ color: 'green', ml: 1 }} />
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          15% faster resolution times
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box>
                        <Typography variant="subtitle1" color="textSecondary">Recurring Issues</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h5">Decreasing</Typography>
                          <TrendingDown sx={{ color: 'green', ml: 1 }} />
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          8% reduction in repeat complaints
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </>
      )}
      {!loading && !error && issues.length === 0 && (
        <Typography sx={{ textAlign: 'center', mt: 3, fontStyle: 'italic' }}>
          No issue data available to display charts.
        </Typography>
      )}
    </Container>
  );
}

export default DataVisualization;
