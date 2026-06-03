import { Paper, Typography, Box } from '@mui/material';

function ActionCard({ title, icon, backgroundColor, onClick }) {
  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: backgroundColor,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            p: 2,
            mb: 2,
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Paper>
  );
}

export default ActionCard;