import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated'); // Clear auth status
    navigate('/admin/login'); // Redirect to login
    console.log('Admin logged out');
  };

  const navItems = [
    { text: 'Manage Issues', path: '/admin/dashboard', icon: <ListAltIcon sx={{ mr: 0.5 }} /> },
    { text: 'Data Visualization', path: '/admin/visualization', icon: <AssessmentIcon sx={{ mr: 0.5 }} /> }, // Placeholder path
    { text: 'Feedback', path: '/admin/feedback', icon: <FeedbackIcon sx={{ mr: 0.5 }} /> },             // Placeholder path
  ];

  return (
    <AppBar position="static" sx={{ bgcolor: 'government.dark' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          BetterTown Admin
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button 
              key={item.text} 
              component={RouterLink} 
              to={item.path}
              color="inherit"
              startIcon={item.icon}
              sx={{
                textTransform: 'none',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                borderBottom: location.pathname === item.path ? '2px solid white' : 'none',
                '&:hover': {
                  borderBottom: '2px solid white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)' // Slight highlight on hover
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        <Button 
          color="inherit" 
          onClick={handleLogout} 
          startIcon={<LogoutIcon sx={{ mr: 0.5 }} />}
          sx={{ 
            ml: 2, 
            textTransform: 'none',
            '&:hover': {
               bgcolor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AdminNavbar;
