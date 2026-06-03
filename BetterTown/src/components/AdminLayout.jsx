import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import { Box } from '@mui/material';
function AdminLayout() {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminNavbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {/* The specific admin page content (like Dashboard, Visualization) will be rendered here and have access to IssueContext */}
          <Outlet /> 
        </Box>
        {/* Optional: Add a common Admin Footer here */}
      </Box>
  );
}

export default AdminLayout;
