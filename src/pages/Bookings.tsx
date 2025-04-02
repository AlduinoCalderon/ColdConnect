import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Bookings: React.FC = () => {
  const { t } = useTranslation();

  // Mock data for bookings
  const bookings = [
    { id: 1, name: 'Booking 1', date: '2023-10-01' },
    { id: 2, name: 'Booking 2', date: '2023-10-02' },
    { id: 3, name: 'Booking 3', date: '2023-10-03' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">
        {t('booking.title')}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Bookings page content will be displayed here
      </Typography>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.id}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                transition: 'transform 0.3s', 
                '&:hover': {
                  transform: 'scale(1.05)', // Scale effect on hover
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Enhanced shadow on hover
                }
              }}
            >
              <Typography variant="h6">{booking.name}</Typography>
              <Typography variant="body2">{booking.date}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Bookings; 