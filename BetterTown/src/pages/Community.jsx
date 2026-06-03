import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  People, 
  Event, 
  Volunteer, 
  Comment, 
  CheckCircle, 
  ArrowForward, 
  CalendarMonth,
  LocationOn,
  AccessTime
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UpcomingEvent = ({ title, date, location, time, image, description, tags }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: '12px', 
        overflow: 'hidden',
        height: '100%',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            color: '#333',
            mb: 2
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarMonth sx={{ color: '#8B0000', mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ color: '#8B0000', mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTime sx={{ color: '#8B0000', mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            {time}
          </Typography>
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag, index) => (
            <Chip 
              key={index} 
              label={tag} 
              size="small" 
              sx={{ 
                bgcolor: '#f5f5f5',
                '&:hover': {
                  bgcolor: '#e0e0e0'
                }
              }} 
            />
          ))}
        </Box>
      </CardContent>
    </Paper>
  );
};

const SuccessStory = ({ name, role, image, quote, project }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: '12px',
        height: '100%',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar 
          src={image} 
          alt={name} 
          sx={{ 
            width: 64, 
            height: 64,
            mr: 2,
            border: '2px solid #8B0000'
          }} 
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role}
          </Typography>
        </Box>
      </Box>
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 2,
          fontStyle: 'italic',
          position: 'relative',
          '&:before': {
            content: '"\\201C"',
            fontSize: '3rem',
            color: '#8B0000',
            opacity: 0.2,
            position: 'absolute',
            top: -20,
            left: -10
          }
        }}
      >
        {quote}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="text.secondary">
        <strong>Project:</strong> {project}
      </Typography>
    </Paper>
  );
};

function Community() {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      title: "Community Clean-up Drive",
      date: "April 15, 2025",
      location: "Besant Nagar Beach",
      time: "8:00 AM - 12:00 PM",
      image: "https://www.cleanupaustralia.org.au/images/default-source/default-album/cleanup-australia-day-2020-7.jpg?sfvrsn=0",
      description: "Join us for a beach clean-up event to help keep our community beautiful. Gloves and bags will be provided.",
      tags: ["Environment", "Volunteer", "Beach"]
    },
    {
      title: "Town Hall Meeting",
      date: "April 20, 2025",
      location: "Community Center, Anna Nagar",
      time: "6:00 PM - 8:00 PM",
      image: "https://www.miamiherald.com/latest-news/m5sxs3/picture261205262/alternates/FREE_1140/MIA_TOWN_HALL_MEETING_KWS.JPG",
      description: "Discuss upcoming infrastructure projects and community initiatives with local officials and planners.",
      tags: ["Planning", "Discussion", "Civic"]
    },
    {
      title: "Tree Planting Initiative",
      date: "April 25, 2025",
      location: "Guindy National Park Perimeter",
      time: "9:00 AM - 1:00 PM",
      image: "https://www.arborday.org/images/hero/medium/hero-tree-planting-roots.jpg",
      description: "Help increase our urban tree canopy by planting native trees. Training and saplings will be provided.",
      tags: ["Environment", "Green", "Volunteer"]
    },
    {
      title: "Community Arts Festival",
      date: "May 5-6, 2025",
      location: "Marina Beach Promenade",
      time: "10:00 AM - 8:00 PM",
      image: "https://img.freepik.com/free-photo/people-enjoying-music-festival-together_23-2149043216.jpg",
      description: "Celebrate local artists, musicians, and performers at this two-day festival showcasing our community's talent.",
      tags: ["Arts", "Culture", "Family"]
    },
    {
      title: "Neighborhood Watch Meeting",
      date: "May 12, 2025",
      location: "Police Station, T. Nagar",
      time: "7:00 PM - 8:30 PM",
      image: "https://www.nnw.org/sites/default/files/2022-06/NNW_Meeting.jpg",
      description: "Learn about neighborhood safety initiatives and how to establish a watch program in your area.",
      tags: ["Safety", "Security", "Community"]
    },
    {
      title: "Youth Leadership Workshop",
      date: "May 18, 2025",
      location: "Public Library, Adyar",
      time: "2:00 PM - 5:00 PM",
      image: "https://www.unicef.org/india/sites/unicef.org.india/files/styles/hero_desktop/public/UNI309640.jpg?itok=LCGm7vvh",
      description: "Empowering young people with leadership skills and community engagement opportunities.",
      tags: ["Youth", "Education", "Leadership"]
    }
  ];

  const successStories = [
    {
      name: "Priya Ramachandran",
      role: "Community Volunteer",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      quote: "BetterTown gave me a platform to voice my concerns about waste management in my neighborhood. Within weeks of reporting the issue, we had a new waste collection system that has transformed our streets.",
      project: "Waste Management Initiative"
    },
    {
      name: "Rajesh Kumar",
      role: "Resident Association President",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "The community engagement tools provided by BetterTown helped us organize our neighborhood and work directly with city officials to improve street lighting and security.",
      project: "Safe Streets Program"
    },
    {
      name: "Anita Sharma",
      role: "School Teacher",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      quote: "Through BetterTown, our school was able to partner with local businesses to create a beautiful community garden that serves as both an educational space and a source of fresh produce.",
      project: "School Garden Initiative"
    },
    {
      name: "Vikram Patel",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      quote: "The infrastructure improvements in our commercial district, which we advocated for through BetterTown, have increased foot traffic and helped all local businesses thrive.",
      project: "Commercial District Revitalization"
    }
  ];

  const engagementWays = [
    {
      icon: <Event sx={{ fontSize: 40, color: '#8B0000' }} />,
      title: "Attend Events",
      description: "Participate in community meetings, workshops, and social events to connect with neighbors and local officials."
    },
    {
      icon: <Volunteer sx={{ fontSize: 40, color: '#8B0000' }} />,
      title: "Volunteer",
      description: "Offer your time and skills to community projects, clean-up drives, and other initiatives that benefit everyone."
    },
    {
      icon: <Comment sx={{ fontSize: 40, color: '#8B0000' }} />,
      title: "Provide Feedback",
      description: "Share your ideas, concerns, and suggestions through our platform to help shape community decisions."
    },
    {
      icon: <People sx={{ fontSize: 40, color: '#8B0000' }} />,
      title: "Join Groups",
      description: "Connect with like-minded residents in interest-based community groups to collaborate on specific issues."
    }
  ];

  return (
    <Box sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#8B0000', 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://img.freepik.com/free-vector/abstract-white-shapes-background_79603-1362.jpg?w=1380&t=st=1712403245~exp=1712403845~hmac=c5c7d9f0b7f78a9e72a3d064822e80f72b308b7a5b8f3d3a2b650c5c0771d2a9")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Community Engagement
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              maxWidth: '800px', 
              mx: 'auto', 
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Join hands with neighbors to create a better living environment for everyone.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Introduction Section */}
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              color: '#333',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#8B0000',
                borderRadius: '2px'
              }
            }}
          >
            Building Stronger Communities Together
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
            At BetterTown, we believe that the most effective solutions come from engaged citizens working together. Our community engagement initiatives create opportunities for residents to connect, collaborate, and contribute to making our town a better place to live, work, and play.
          </Typography>
        </Box>

        {/* Ways to Engage Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333'
            }}
          >
            Ways to Get Involved
          </Typography>
          <Grid container spacing={4}>
            {engagementWays.map((way, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {way.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 'bold'
                      }}
                    >
                      {way.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {way.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Upcoming Events Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333'
            }}
          >
            Upcoming Community Events
          </Typography>
          <Grid container spacing={4}>
            {upcomingEvents.map((event, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <UpcomingEvent {...event} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Success Stories Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333'
            }}
          >
            Community Success Stories
          </Typography>
          <Grid container spacing={4}>
            {successStories.map((story, index) => (
              <Grid item xs={12} md={6} key={index}>
                <SuccessStory {...story} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 8 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)'
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 3, 
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center'
              }}
            >
              Benefits of Community Engagement
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              When residents actively participate in community initiatives, everyone benefits. Here are some of the positive outcomes of strong community engagement:
            </Typography>
            <List>
              {[
                "Stronger social connections and reduced isolation",
                "More responsive and effective local governance",
                "Improved public spaces that reflect community needs",
                "Greater sense of ownership and pride in the neighborhood",
                "Enhanced safety through community vigilance and cooperation",
                "More opportunities for personal growth and skill development"
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: '#8B0000' }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            p: 4,
            borderRadius: '12px',
            bgcolor: '#f5f5f5'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              color: '#333'
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            Your voice matters, and your contributions can help shape the future of our community. Join us today and be part of the positive change.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: '#8B0000',
              color: 'white',
              py: 1.5,
              px: 4,
              '&:hover': {
                bgcolor: '#600000',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Community;
