import { useState, useMemo } from 'react';
import { useIssues } from '../../context/IssueContext';
import { formatDistanceToNow } from 'date-fns';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Error,
  Info,
  Delete,
  Warning,
} from '@mui/icons-material';

function Notifications() {
  const [currentTab, setCurrentTab] = useState(0);
  const { issues } = useIssues();

  // Generate notifications dynamically from issues data
  const notifications = useMemo(() => {
    const unread = [];
    const earlier = [];

    if (!issues) return { unread, earlier };

    issues.forEach((issue) => {
      let type, title, message;
      
      switch (issue.status) {
        case 'Resolved':
          type = 'success';
          title = 'Complaint Resolved';
          message = `Your complaint (ID: ${issue.complaintId}) has been successfully resolved. ${issue.adminFeedback ? 'Feedback: ' + issue.adminFeedback : ''}`;
          break;
        case 'In Progress':
          type = 'info';
          title = 'Status Update';
          message = `Work is in progress for complaint ID: ${issue.complaintId}.`;
          break;
        case 'Rejected':
          type = 'error';
          title = 'Complaint Rejected';
          message = `Your complaint (ID: ${issue.complaintId}) was rejected. ${issue.adminFeedback ? 'Reason: ' + issue.adminFeedback : ''}`;
          break;
        case 'Pending':
        default:
          type = 'warning';
          title = 'Application Submitted';
          message = `Your complaint (ID: ${issue.complaintId}) has been received and is pending review.`;
          break;
      }

      const dateStr = issue.updatedAt 
        ? formatDistanceToNow(new Date(issue.updatedAt), { addSuffix: true })
        : (issue.createdAt ? formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true }) : 'Recently');

      const timestamp = issue.updatedAt 
        ? new Date(issue.updatedAt).getTime() 
        : (issue.createdAt ? new Date(issue.createdAt).getTime() : 0);

      const notif = {
        id: issue._id || Math.random().toString(),
        type,
        title,
        message,
        date: dateStr,
        timestamp,
      };

      // Split into unread (within last 24h) and earlier
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp < oneDay) {
        unread.push(notif);
      } else {
        earlier.push(notif);
      }
    });

    // Sort by newest first
    unread.sort((a, b) => b.timestamp - a.timestamp);
    earlier.sort((a, b) => b.timestamp - a.timestamp);

    return { unread, earlier };
  }, [issues]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'error':
        return <Error sx={{ color: 'error.main' }} />;
      case 'warning':
        return <Warning sx={{ color: 'warning.main' }} />;
      case 'info':
        return <Info sx={{ color: 'info.main' }} />;
      default:
        return <NotificationsIcon />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderNotificationList = (notificationList) => (
    <List>
      {notificationList.map((notification) => (
        <ListItem
          key={notification.id}
          sx={{
            mb: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
          }}
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <Delete />
            </IconButton>
          }
        >
          <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={{ component: 'div' }}
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {notification.title}
                </Typography>
                <Chip
                  label={notification.date}
                  size="small"
                  sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }}
                />
              </Box>
            }
            secondary={notification.message}
          />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, sm: 10 },
        pb: 8,
        backgroundColor: '#f5f5f5',
        overflowX: 'hidden',
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          mt: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderTop: '4px solid #8B0000',
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: '#8B0000',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
              }}
            >
              <NotificationsIcon /> Notifications
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Stay updated with the latest information about your complaints and applications
            </Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    New
                    <Badge
                      badgeContent={notifications.unread.length}
                      color="error"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                }
              />
              <Tab label="Earlier" />
            </Tabs>
          </Box>

          <Box 
            sx={{ 
              mt: 2,
              maxHeight: '60vh',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#8B0000',
                borderRadius: '4px',
                '&:hover': {
                  background: '#640000',
                },
              },
            }}
          >
            {currentTab === 0 ? (
              renderNotificationList(notifications.unread)
            ) : (
              renderNotificationList(notifications.earlier)
            )}
          </Box>
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
            Notification Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • Email notifications are sent to your registered email address
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                • SMS alerts are sent for important updates
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Notifications; 