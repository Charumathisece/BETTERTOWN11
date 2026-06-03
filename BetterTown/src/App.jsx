import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext.jsx';
import { IssueProvider } from './context/IssueContext.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ReportIssue from './pages/issues/ReportIssue';
import ViewStatus from './pages/track/ViewStatus';
import TrackApplication from './pages/track/TrackApplication';
import Notifications from './pages/notifications/Notifications';
import UserFeedback from './pages/feedback/Feedback';
import ContactUs from './pages/ContactUs';

// Admin Pages
import AdminLogin from './pages/auth/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRegister from './pages/auth/AdminRegister';
import ProtectedRoute from './components/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminLanding from './pages/admin/AdminLanding';
import AdminLayout from './components/AdminLayout';
import DataVisualization from './pages/admin/DataVisualization';
import Feedback from './pages/admin/Feedback';
import IssueDetail from './pages/admin/IssueDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep blue color
    },
    secondary: {
      main: '#4a148c', // Deep purple color
    },
    government: {
      main: '#8B0000', // Deep red color commonly used in government sites
      dark: '#640000',
      light: '#B22222',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Main Navbar for non-admin pages */}
          <Routes>
            {/* Public routes with main Navbar */}
            <Route element={<><Navbar /><Outlet /></>}> 
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<ContactUs />} />
              
              {/* Protected User Routes */}
              <Route element={<UserProtectedRoute />}>
                <Route path="/report-issue" element={<ReportIssue />} />
                <Route path="/view-status" element={<ViewStatus />} />
                <Route path="/track" element={<TrackApplication />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/feedback" element={<UserFeedback />} />
              </Route>
              
              {/* Admin Landing Page (Public) - has main Navbar */}
              <Route path="/admin" element={<AdminLanding />} />
            </Route>

            {/* Standalone Admin Auth Routes (No main Navbar, No Admin Navbar) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />

            {/* Protected Admin Routes with AdminLayout (includes AdminNavbar) */}
            <Route element={<ProtectedRoute />}> 
              <Route element={<AdminLayout />}> {/* Apply AdminLayout here */} 
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/visualization" element={<DataVisualization />} />
                <Route path="/admin/feedback" element={<Feedback />} /> {/* Corrected component name */}
                <Route path="/admin/issues/:issueId" element={<IssueDetail />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </Router>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;