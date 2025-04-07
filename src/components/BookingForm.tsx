import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Booking } from '../types';
import { bookingService } from '../services/bookingService';

interface BookingFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  booking?: Booking;
  mode: 'create' | 'edit';
}
//comment to push
// Define the form data type that includes the units property 
interface BookingFormData extends Omit<Booking, 'bookingId' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  units: { unitId: number; pricePerHour: number }[];
}

const BookingForm: React.FC<BookingFormProps> = ({
  open,
  onClose,
  onSuccess,
  booking,
  mode,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    customerId: 0,
    warehouseId: 0,
    startDate: '',
    endDate: '',
    status: 'pending',
    notes: '',
    units: [{ unitId: 0, pricePerHour: 0 }], // Default empty unit
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && booking) {
      // Format dates for input fields (YYYY-MM-DDThh:mm)
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };

      // Create a copy of the booking data
      const bookingData = { ...booking };
      
      // Set the form data with the booking data
      setFormData({
        ...bookingData,
        startDate: formatDate(bookingData.startDate),
        endDate: formatDate(bookingData.endDate),
        // Always provide units, even if they don't exist in the booking
        units: [{ unitId: 0, pricePerHour: 0 }],
      });
    } else {
      // Reset form for create mode
      setFormData({
        customerId: 0,
        warehouseId: 0,
        startDate: '',
        endDate: '',
        status: 'pending',
        notes: '',
        units: [{ unitId: 0, pricePerHour: 0 }], // Default empty unit
      });
    }
  }, [booking, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  // Separate handler for Select component
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'create') {
        await bookingService.create(formData as BookingFormData);
      } else if (mode === 'edit' && booking) {
        await bookingService.update(booking.bookingId, formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to save booking. Please try again.');
      console.error('Error saving booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!booking) return;
    
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setLoading(true);
      try {
        await bookingService.delete(booking.bookingId);
        onSuccess();
        onClose();
      } catch (err) {
        setError('Failed to delete booking. Please try again.');
        console.error('Error deleting booking:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddStorageUnit = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
        {mode === 'create' ? 'Create New Booking' : 'Edit Booking'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="customerId"
                label="Customer ID"
                type="number"
                value={formData.customerId}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="warehouseId"
                label="Warehouse ID"
                type="number"
                value={formData.warehouseId}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="startDate"
                label="Start Date"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="endDate"
                label="End Date"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status || 'pending'}
                  onChange={handleSelectChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            {/* Units section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                Storage Units
              </Typography>
              {formData.units?.map((unit, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    label="Unit ID"
                    type="number"
                    value={unit.unitId}
                    onChange={(e) => {
                      const newUnits = [...(formData.units || [])];
                      newUnits[index] = { ...unit, unitId: Number(e.target.value) };
                      setFormData({ ...formData, units: newUnits });
                    }}
                    fullWidth
                  />
                  <TextField
                    label="Price Per Hour"
                    type="number"
                    value={unit.pricePerHour}
                    onChange={(e) => {
                      const newUnits = [...(formData.units || [])];
                      newUnits[index] = { ...unit, pricePerHour: Number(e.target.value) };
                      setFormData({ ...formData, units: newUnits });
                    }}
                    fullWidth
                  />
                </Box>
              ))}
              <Button 
                variant="outlined" 
                onClick={handleAddStorageUnit}
                sx={{ mt: 1 }}
              >
                Add Unit
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Box>
            {mode === 'edit' && (
              <IconButton 
                color="error" 
                onClick={handleDelete}
                disabled={loading}
                sx={{ mr: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <Box>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
              sx={{ ml: 1 }}
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </Box>
        </DialogActions>
      </form>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Storage Unit</DialogTitle>
        <DialogContent>
          {/* Add your StorageUnitForm component here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default BookingForm; 