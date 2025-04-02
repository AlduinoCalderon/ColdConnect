import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { bookingService } from '../services/bookingService';
import { Booking } from '../types';
import { useTheme } from '@mui/material/styles';

const Bookings: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
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
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>{t('booking.title')}</Typography>
      <Button variant="contained" onClick={handleAddBooking} sx={{ mb: 2 }}>
        Add Booking
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Booking ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow 
                key={booking.bookingId} 
                sx={{ 
                  backgroundColor: index % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper, 
                  '&:hover': { backgroundColor: theme.palette.action.selected } 
                }}
              >
                <TableCell>{booking.bookingId}</TableCell>
                <TableCell>{booking.startDate}</TableCell>
                <TableCell>{booking.endDate}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Bookings; 