import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Warehouse as WarehouseIcon,
  EventNote as BookingIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';

import { readingService } from '../services/readingService';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { warehouseService } from '../services/warehouseService';
import { storageUnitService } from '../services/storageUnitService';
import { Warehouse, StorageUnit, Booking } from '../types';
import { Reading } from '../types';
import { bookingService } from '../services/bookingService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingUnitsMap, setBookingUnitsMap] = useState<{ [key: number]: { unitId: number; pricePerHour: number }[] }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<{ [key: number]: string }>({});
  const [warehouseNames, setWarehouseNames] = useState<{ [key: number]: string }>({});

  // Calculate statistics
  const totalWarehouses = warehouses?.length || 0;
  const totalBookings = storageUnits?.filter(unit => unit?.status === 'occupied')?.length || 0;
  
  const totalOccupancyRate = warehouses?.length > 0
    ? warehouses.reduce((sum, warehouse) => {
        const warehouseUnits = storageUnits?.filter(unit => unit?.warehouseId === warehouse?.warehouseId) || [];
        const totalUnits = warehouseUnits.length;
        const availableUnits = warehouseUnits.filter(unit => unit?.status === 'available').length;
        return sum + (totalUnits > 0 ? ((totalUnits - availableUnits) / totalUnits) * 100 : 0);
      }, 0) / warehouses.length
    : 0;

  // Get latest readings for temperature chart
  const temperatureData = {
    labels: readings?.map(reading => new Date(reading?.timestamp).toLocaleTimeString()) || [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: readings?.map(reading => reading?.value) || [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Readings',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [warehousesData, storageUnitsData, readingsData, bookingsData] = await Promise.all([
          warehouseService.getAll(),
          storageUnitService.getAll(),
          readingService.getLatestReadings('temperature', 20),
          bookingService.getAll()
        ]);

        // Crear mapa de nombres de almacenes
        const warehouseMap: { [key: number]: string } = {};
        warehousesData?.forEach(warehouse => {
          warehouseMap[warehouse.warehouseId] = warehouse.name;
        });

        // Obtener las unidades para cada reserva
        const unitsMap: { [key: number]: { unitId: number; pricePerHour: number }[] } = {};
        for (const booking of bookingsData || []) {
          try {
            const units = await bookingService.getBookingUnits(booking.bookingId);
            unitsMap[booking.bookingId] = units;
          } catch (error) {
            console.error(`Error fetching units for booking ${booking.bookingId}:`, error);
            unitsMap[booking.bookingId] = [];
          }
        }

        setWarehouses(warehousesData || []);
        setStorageUnits(storageUnitsData || []);
        setReadings(readingsData || []);
        setBookings(bookingsData || []);
        setBookingUnitsMap(unitsMap);
        setWarehouseNames(warehouseMap);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data. Please try again.');
        setWarehouses([]);
        setStorageUnits([]);
        setReadings([]);
        setBookings([]);
        setBookingUnitsMap({});
        setWarehouseNames({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get recent activity (latest occupied units with their bookings)
  const recentActivity = storageUnits
    ?.filter(unit => unit?.status === 'occupied')
    ?.map(unit => {
      console.log('Processing unit:', unit);
      // Buscar la reserva activa para esta unidad
      const unitBooking = bookings?.find(booking => {
        console.log('Checking booking:', booking);
        // Obtener las unidades de la reserva del mapa
        const currentBookingUnits = bookingUnitsMap[booking.bookingId] || [];
        console.log('Current booking units:', currentBookingUnits);
        
        // Verificar si la unidad está en la reserva y si la reserva está activa
        const isUnitInBooking = currentBookingUnits.some((bu: { unitId: number; pricePerHour: number }) => {
          console.log('Comparing unit:', bu.unitId, 'with:', unit.unitId);
          return bu.unitId === unit.unitId;
        });
        
        const isBookingActive = (booking.status === 'confirmed' || booking.status === 'completed') && 
                               new Date(booking.startDate) <= new Date() && 
                               new Date(booking.endDate) >= new Date();
        
        console.log('Unit in booking:', isUnitInBooking);
        console.log('Booking active:', isBookingActive);
        
        return isUnitInBooking && isBookingActive;
      });
      
      console.log('Found booking for unit:', unitBooking);
      if (unitBooking) {
        console.log('Booking details:', {
          startDate: unitBooking.startDate,
          endDate: unitBooking.endDate,
          status: unitBooking.status
        });
      }
      
      return {
        ...unit,
        booking: unitBooking
      };
    })
    ?.sort((a, b) => {
      const dateA = a.booking?.startDate ? new Date(a.booking.startDate).getTime() : 0;
      const dateB = b.booking?.startDate ? new Date(b.booking.startDate).getTime() : 0;
      return dateB - dateA;
    })
    ?.slice(0, 5) || [];

  // Función para formatear la fecha
  const formatDate = (dateString: string | undefined) => {
    console.log('Formatting date:', dateString);
    if (!dateString) {
      console.log('No date string provided');
      return 'N/A';
    }
    try {
      const date = new Date(dateString);
      console.log('Parsed date:', date);
      if (isNaN(date.getTime())) {
        console.log('Invalid date');
        return 'N/A';
      }
      const formattedDate = date.toLocaleString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      console.log('Formatted date:', formattedDate);
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        {t('common.welcome')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('warehouse.title')}
            value={totalWarehouses}
            icon={<WarehouseIcon sx={{ color: 'white' }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('booking.title')}
            value={totalBookings}
            icon={<BookingIcon sx={{ color: 'white' }} />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Occupancy Rate"
            value={`${totalOccupancyRate.toFixed(1)}%`}
            icon={<TrendingUpIcon sx={{ color: 'white' }} />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Alerts"
            value="3"
            icon={<WarningIcon sx={{ color: 'white' }} />}
            color="#f44336"
          />
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%', maxHeight: '400px', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List dense>
              {recentActivity?.map((unit, index) => (
                <React.Fragment key={unit?.unitId}>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Unit ${unit?.name}`}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            Warehouse: {warehouseNames[unit?.warehouseId] || 'Unknown'}
                          </Typography>
                          {unit?.booking && (
                            <>
                              <br />
                              <Typography variant="body2" component="span">
                                From: {formatDate(unit.booking.startDate)}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span">
                                To: {formatDate(unit.booking.endDate)}
                              </Typography>
                              {unit.booking.notes && (
                                <>
                                  <br />
                                  <Typography variant="body2" component="span" color="text.secondary">
                                    Notes: {unit.booking.notes}
                                  </Typography>
                                </>
                              )}
                            </>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              {(!recentActivity || recentActivity.length === 0) && (
                <Typography color="text.secondary">
                  No recent activity
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Temperature Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
            </Typography>
            <Box sx={{ mt: 2, height: '500px', width: '100%' }}>
              <iframe 
                style={{ 
                  background: '#FFFFFF',
                  border: 'none',
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                  width: '100%',
                  height: '100%'
                }} 
                src="https://charts.mongodb.com/charts-project-0-esjksfr/embed/charts?id=12f79464-0622-4701-9cb1-25fabc6eb583&maxDataAge=3600&theme=light&autoRefresh=true"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 