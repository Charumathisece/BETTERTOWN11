import { Box, Container, Typography, Grid, Paper, Button, Divider, useTheme, useMediaQuery } from '@mui/material';
import { HowToReg, Search, ContactSupport, ArrowForward, KeyboardArrowLeft, KeyboardArrowRight, ArrowBackTwoTone } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import ActionCard from '../components/ActionCard';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const images = [
  "https://www.hindustantimes.com/ht-img/img/2023/03/11/1600x900/Mumbai--India---March-09--2023--Garbage-thrown-on-_1678561458588.jpg",
  "https://th.bing.com/th/id/R.9f2ed3c698e5b5784b7c9d979c2bab94?rik=26FHc%2fz38VQGzQ&riu=http%3a%2f%2fmediaindia.eu%2fwp-content%2fuploads%2f2017%2f01%2fLED-lights-delhi.jpg&ehk=Bhdims7PflJE6v%2f9wD9wvQP5GcUMRwCY8hKLCQXug8U%3d&risl=&pid=ImgRaw&r=0",
  "https://th-i.thgim.com/public/incoming/utofub/article67633666.ece/alternates/LANDSCAPE_1200/WhatsApp%20Image%202023-12-13%20at%2012.25.40%20PM.jpeg",
  "https://wbl.worldbank.org/content/dam/sites/wbl/img/780x439/WBL2024-WomensSafety-780X439.jpg",
  "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202205/tn_bus-sixteen_nine.jpeg?size=948:533"
];

const sliderContent = [
  {
    title: "Report Local Issues",
    subtitle: "Help improve your community by reporting problems",
    // buttonText: "Report Now",
    // link: "/report"
  },
  {
    title: "Better Infrastructure",
    subtitle: "Working together for improved public facilities",
    buttonText: "Learn More",
    link: "/report"
  },
  {
    title: "Community Engagement",
    subtitle: "Join hands to create a better living environment",
    buttonText: "Get Involved",
    link: "/report"
  },
  {
    title: "Safe Neighborhoods",
    subtitle: "Ensuring security and wellbeing for all residents",
    buttonText: "View Initiatives",
    link: "/report"
  },
  {
    title: "Public Transportation",
    subtitle: "Enhancing mobility and connectivity",
    buttonText: "Explore Services",
    link: "/report"
  }
];

const ImageSlider = () => {
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        position: "relative",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        height: "600px"  // Increased height for better impact
      }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.5)",
                  transition: "transform 10s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  }
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)",
                }}
              />
              <Container
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    textTransform: "uppercase",
                    mb: 2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                    animation: "fadeInDown 1s ease",
                    fontSize: { xs: "2.5rem", md: "3.5rem" }
                  }}
                >
                  {sliderContent[index].title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
                    maxWidth: "800px",
                    animation: "fadeInUp 1s ease",
                    fontSize: { xs: "1.2rem", md: "1.5rem" }
                  }}
                >
                  {sliderContent[index].subtitle}
                </Typography>
                {/* <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowBackTwoTone />}
                  onClick={() => navigate(sliderContent[index].link)}
                  sx={{
                    backgroundColor: "#8B0000",
                    color: "white",
                    py: 1.5,
                    px: 4,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "30px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                    "&:hover": {
                      backgroundColor: "#600000",
                      transform: "translateY(-3px)",
                      boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
                    },
                    transition: "all 0.3s ease",
                    animation: "fadeInUp 1.2s ease",
                  }}
                >
                  {sliderContent[index].buttonText}
                </Button> */}
              </Container>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box 
        className="swiper-button-prev" 
        sx={{
          position: "absolute",
          left: { xs: "10px", md: "30px" },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          color: "white",
          width: { xs: "40px", md: "50px" },
          height: { xs: "40px", md: "50px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.3)",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(139, 0, 0, 0.7)",
          }
        }}
      >
        <KeyboardArrowLeft sx={{ fontSize: { xs: 30, md: 40 } }} />
      </Box>
      <Box 
        className="swiper-button-next" 
        sx={{
          position: "absolute",
          right: { xs: "10px", md: "30px" },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          color: "white",
          width: { xs: "40px", md: "50px" },
          height: { xs: "40px", md: "50px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: "rgba(0,0,0,0.3)",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(139, 0, 0, 0.7)",
          }
        }}
      >
        <KeyboardArrowRight sx={{ fontSize: { xs: 30, md: 40 } }} />
      </Box>
    </Box>
  );
};

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <Box sx={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box sx={{ position: 'relative', margin: 0, padding: 0 }}>
        <ImageSlider />
      </Box>

      {/* Marquee positioned right below the slider */}
      <Box
        sx={{
          backgroundColor: '#8B0000',
          padding: 0,
          margin: 0,
          width: '100%',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="8"
          style={{
            color: 'white',
            padding: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="https://cdn-icons-gif.flaticon.com/16903/16903944.gif"
            alt="sticker"
            style={{
              width: '40px',
              height: '40px',
              marginLeft: '15px',
              verticalAlign: 'middle'
            }}
          />
          Welcome to BetterTown - Report civic issues and improve your community! 🌟
          <img
            src="https://cdn-icons-gif.flaticon.com/14178/14178125.gif"
            alt="sticker"
            style={{
              width: '40px',
              height: '40px',
              marginLeft: '15px',
              verticalAlign: 'middle'
            }}
          />
        </marquee>
      </Box>

      {/* Action Cards Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 8, 
          mb: 8, 
          position: 'relative', 
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ 
            mb: 5, 
            fontWeight: 'bold',
            color: '#333',
            position: 'relative',
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
          Quick Actions
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ActionCard
              title="View Status"
              icon={<Search sx={{ fontSize: 40, color: '#1a237e' }} />}
              backgroundColor="#e91e63"
              onClick={() => navigate('/track')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ActionCard
              title="Contact Us"
              icon={<ContactSupport sx={{ fontSize: 40, color: '#1a237e' }} />}
              backgroundColor="#ff9800"
              onClick={() => navigate('/contact')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ActionCard
              title="Admin"
              icon={<HowToReg sx={{ fontSize: 40, color: '#1a237e' }} />}
              backgroundColor="#3f51b5"
              onClick={() => navigate('/admin/login')}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box
        sx={{
          py: 10,
          position: 'relative',
          color: 'white',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://cdn.vectorstock.com/i/500p/18/66/chennai-city-outline-vector-42511866.avif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: -1,
            transform: 'scale(1.1)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Our Impact
          </Typography>
          <Grid container spacing={6} textAlign="center">
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  py: 4, 
                  px: 2, 
                  borderRadius: 4, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  }
                }}
              >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                  <CountUp start={0} end={500} duration={8.5} />+
                </Typography>
                <Typography variant="h5" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Issues Resolved
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  py: 4, 
                  px: 2, 
                  borderRadius: 4, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  }
                }}
              >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  <CountUp start={0} end={1000} duration={8.5} />+
                </Typography>
                <Typography variant="h5" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Active Users
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={0} 
                sx={{ 
                  py: 4, 
                  px: 2, 
                  borderRadius: 4, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                  }
                }}
              >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                  <CountUp start={0} end={24} duration={7} />/7
                </Typography>
                <Typography variant="h5" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                  Support Available
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              color: '#333',
              position: 'relative',
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
            How It Works
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    '& img': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover img': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/12597/12597785.png"
                    alt="Register"
                    style={{ width: 96, height: 96 }}
                  />
                </Box>
                <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#8B0000' }}>
                  1. Register
                </Typography>
                <Divider sx={{ mb: 2, width: '30%', mx: 'auto', borderColor: '#8B0000' }} />
                <Typography variant="body1" color="text.secondary">
                  Create an account to start reporting issues in your community
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    '& img': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover img': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/17871/17871683.png"
                    alt="Report"
                    style={{ width: 96, height: 96 }}
                  />
                </Box>
                <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#8B0000' }}>
                  2. Report Issues
                </Typography>
                <Divider sx={{ mb: 2, width: '30%', mx: 'auto', borderColor: '#8B0000' }} />
                <Typography variant="body1" color="text.secondary">
                  Report local issues with location, photos, and descriptions
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    '& img': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover img': {
                      transform: 'scale(1.1) rotate(5deg)',
                    }
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2795/2795368.png"
                    alt="Track"
                    style={{ width: 96, height: 96 }}
                  />
                </Box>
                <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 'bold', color: '#8B0000' }}>
                  3. Track Progress
                </Typography>
                <Divider sx={{ mb: 2, width: '30%', mx: 'auto', borderColor: '#8B0000' }} />
                <Typography variant="body1" color="text.secondary">
                  Monitor the status and updates of your reported issues
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* City Image Section */}
      <Box 
        sx={{ 
          py: 10, 
          textAlign: 'center', 
          bgcolor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{ 
                mb: 6, 
                fontWeight: 'bold',
                color: '#333',
                position: 'relative',
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
              Building Better Communities
            </Typography>
            <Box 
              sx={{ 
                position: 'relative',
                '&:hover img': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                },
              }}
            >
              <img
                src="https://img.freepik.com/premium-vector/vector-illustration-chennai-skyline-tamil-nadu-india_668947-294.jpg?w=2000"
                alt="Better Town Initiative"
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  transition: 'all 0.5s ease',
                }}
              />
            </Box>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/login')}
              sx={{
                mt: 6,
                backgroundColor: "#8B0000",
                color: "white",
                py: 1.5,
                px: 4,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "30px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                "&:hover": {
                  backgroundColor: "#600000",
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
