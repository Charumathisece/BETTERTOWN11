import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AccountCircle, NotificationsActive, Logout, Feedback as FeedbackIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isScrolled
          ? 'linear-gradient(to right, #8B0000, #640000)'
          : 'linear-gradient(to right, rgba(139, 0, 0, 0.9), rgba(100, 0, 0, 0.9))',
        backdropFilter: 'blur(8px)',
        boxShadow: isScrolled ? 1 : 'none',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1200,
      }}
    >
      <Toolbar>
        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            component="img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROb86eO3dYK9jiJ5j3bHIP-KBak7UtMAhu0Hjr_Numqoh3beA-u7pk71nF9ILgyoTvegY&usqp=CAU"
            alt="Tamil Nadu Flag"
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%", // Makes it round
              mr: 1, // Adds margin to the right
            }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              letterSpacing: "1px",
              color: "white",
              textDecoration: "none",
            }}
          >
            BetterTown!
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Show these buttons only when user is authenticated */}
          {isAuthenticated && (
            <>
              <Button
                component={Link}
                to="/report-issue"
                color="inherit"
                sx={{
                  borderBottom:
                    location.pathname === "/report-issue" ? "2px solid white" : "none",
                  "&:hover": {
                    borderBottom: "2px solid white",
                  },
                }}
              >
                Report Issue
              </Button>
              <Button
                component={Link}
                to="/view-status"
                color="inherit"
                sx={{
                  borderBottom:
                    location.pathname === "/view-status" ? "2px solid white" : "none",
                  "&:hover": {
                    borderBottom: "2px solid white",
                  },
                }}
              >
                Track Issues
              </Button>
              <Button
                component={Link}
                to="/notifications"
                color="inherit"
                startIcon={<NotificationsActive />}
                sx={{
                  borderBottom:
                    location.pathname === "/notifications" ? "2px solid white" : "none",
                  "&:hover": {
                    borderBottom: "2px solid white",
                  },
                }}
              >
                Notifications
              </Button>
              <Button
                component={Link}
                to="/feedback"
                color="inherit"
                startIcon={<FeedbackIcon />}
                sx={{
                  borderBottom:
                    location.pathname === "/feedback" ? "2px solid white" : "none",
                  "&:hover": {
                    borderBottom: "2px solid white",
                  },
                }}
              >
                Feedback
              </Button>
            </>
          )}

          <Button
            component={Link}
            to="/admin"
            color="inherit"
            sx={{
              borderBottom:
                location.pathname.startsWith('/admin') ? "2px solid white" : "none",
              "&:hover": {
                borderBottom: "2px solid white",
              },
            }}
          >
            Admin
          </Button>

          {/* Show Sign In button if not authenticated, otherwise show Logout */}
          {!isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                startIcon={<AccountCircle />}
                sx={{
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: isScrolled
                      ? "rgba(255, 255, 255, 0.1)"
                      : "primary.dark",
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                variant={isScrolled ? "outlined" : "contained"}
                sx={{
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: isScrolled
                      ? "rgba(255, 255, 255, 0.1)"
                      : "primary.dark",
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              startIcon={<Logout />}
              variant={isScrolled ? "outlined" : "contained"}
              onClick={handleLogout}
              sx={{
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: isScrolled
                    ? "rgba(255, 255, 255, 0.1)"
                    : "primary.dark",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;