import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';

const Bookings: React.FC = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getAll();
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleAddBooking = () => {
    // Logic to open a form for adding a new booking
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{t('booking.title')}</Typography>
      <Button variant="contained" onClick={handleAddBooking} sx={{ mt: 2 }}>
        Add Booking
      </Button>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {bookings.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking.bookingId}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                transition: 'transform 0.3s', 
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                }
              }}
            >
              <Typography variant="h6">{`Booking ID: ${booking.bookingId}`}</Typography>
              <Typography variant="body2">{`Start: ${booking.startDate}`}</Typography>
              <Typography variant="body2">{`End: ${booking.endDate}`}</Typography>
              <Typography variant="body2">{`Status: ${booking.status}`}</Typography>
              <Typography variant="body2">{`Notes: ${booking.notes}`}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Bookings; 