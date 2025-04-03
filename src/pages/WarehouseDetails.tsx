import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Storage as StorageIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { warehouseService, Warehouse } from '../services/warehouseService';
import { storageUnitService } from '../services/storageUnitService';
import { StorageUnit } from '../types';

const WarehouseHeader: React.FC<{ warehouse: Warehouse }> = ({ warehouse }) => {
  return (
    <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
            {warehouse.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'white' }}>
            <LocationIcon />
            <Typography variant="body1">{warehouse.address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
              <StorageIcon />
              <Typography variant="body1">
                Total Units: {warehouse.totalUnits || 0}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
              <StorageIcon />
              <Typography variant="body1">
                Available Units: {warehouse.availableUnits || 0}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
              <StorageIcon />
              <Typography variant="body1">
                Occupancy Rate: {warehouse.occupancyRate || 0}%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
              <StorageIcon />
              <Typography variant="body1">
                Average Temperature: {warehouse.averageTemperature || 0}°C
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white' }}>
              <StorageIcon />
              <Typography variant="body1">
                Average Humidity: {warehouse.averageHumidity || 0}%
              </Typography>
            </Box>
            <Chip 
              label={warehouse.status} 
              color={warehouse.status === 'active' ? 'success' : 'default'}
              sx={{ alignSelf: 'flex-start', mt: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

const StorageUnitCard: React.FC<{ unit: StorageUnit }> = ({ unit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'closed':
        return 'error';
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">{unit.name}</Typography>
        </Box>
        <Chip 
          label={unit.status} 
          color={getStatusColor(unit.status)}
          size="small"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          Temperature Range: {unit.minTemp}°C - {unit.maxTemp}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Humidity Range: {unit.minHumidity}% - {unit.maxHumidity}%
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Cost: ${unit.costPerHour}/hour
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dimensions: {unit.width}m × {unit.height}m × {unit.depth}m
        </Typography>
      </CardContent>
    </Card>
  );
};

const AddStorageUnitCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <IconButton size="large" color="primary">
          <AddIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography variant="h6" color="text.secondary">
          Add New Storage Unit
        </Typography>
      </CardContent>
    </Card>
  );
};

const WarehouseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouseData = await warehouseService.getById(Number(id));
        setWarehouse(warehouseData);
        
        try {
          const units = await storageUnitService.getByWarehouseId(Number(id));
          setStorageUnits(units);
        } catch (unitsError) {
          console.error('Error fetching storage units:', unitsError);
          setStorageUnits([]);
        }
      } catch (err) {
        console.error('Error fetching warehouse:', err);
        setError('No se pudo cargar la información del almacén. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddStorageUnit = () => {
    setOpenDialog(true);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!warehouse) {
    return (
      <Container>
        <Alert severity="error">Warehouse not found</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <WarehouseHeader warehouse={warehouse} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StorageIcon color="primary" />
          Storage Units
        </Typography>
        
        {storageUnits.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center', mb: 3 }}>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              This warehouse currently has no storage units assigned.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddStorageUnit}
              sx={{ mt: 2 }}
            >
              Add First Storage Unit
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {storageUnits.map((unit) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={unit.unitId}>
                <StorageUnitCard unit={unit} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AddStorageUnitCard onClick={handleAddStorageUnit} />
            </Grid>
          </Grid>
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Storage Unit</DialogTitle>
        <DialogContent>
          {/* Aquí irá el formulario para agregar un nuevo storage unit */}
          <Typography>Storage Unit Form will go here</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Add Storage Unit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WarehouseDetails; 