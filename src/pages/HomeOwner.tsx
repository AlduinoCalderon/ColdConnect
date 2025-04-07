import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
//comentario pa poder pushear
import {
  Warehouse as WarehouseIcon,
  EventNote as BookingIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import WarehouseCard from '../components/WarehouseCard';
import WarehouseForm from '../components/warehouse/WarehouseForm';
import { Warehouse, warehouseService } from '../services/warehouseService';
import { StorageUnit } from '../types';
import { storageUnitService } from '../services/storageUnitService';
import StorageUnitCard from '../components/storageUnit/StorageUnitCard';
import StorageUnitForm from '../components/storageUnit/StorageUnitForm';
import AddStorageUnitCard from '../components/storageUnit/AddStorageUnitCard';

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

const AddWarehouseCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
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
          Add New Warehouse
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const [openStorageUnitDialog, setOpenStorageUnitDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<StorageUnit | null>(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const data = await warehouseService.getAll();
        setWarehouses(data);
      } catch (err) {
        console.error('Error fetching warehouses:', err);
        setError(t('warehouse.error.fetch'));
      }
    };

    const fetchStorageUnits = async () => {
      try {
        const data = await storageUnitService.getAll();
        setStorageUnits(data);
      } catch (err) {
        console.error('Error fetching storage units:', err);
        setError(t('storageUnit.error.fetch'));
      }
    };

    fetchWarehouses();
    fetchStorageUnits();
  }, []);

  const handleAddWarehouse = () => {
    setOpenDialog(true);
  };

  const handleSubmit = async (data: Omit<Warehouse, 'warehouseId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const newWarehouse = await warehouseService.create(data);
      setWarehouses([...warehouses, newWarehouse]);
      setOpenDialog(false);
      setError(null);
    } catch (err) {
      console.error('Error saving warehouse:', err);
      setError(t('warehouse.error.save'));
    }
  };

  const handleAddStorageUnit = () => {
    setSelectedUnit(null);
    setOpenStorageUnitDialog(true);
  };

  const handleStorageUnitSubmit = async (data: Omit<StorageUnit, 'unitId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const newUnit = await storageUnitService.create(data);
      setStorageUnits([...storageUnits, newUnit]);
      setOpenStorageUnitDialog(false);
    } catch (err) {
      console.error('Error saving storage unit:', err);
      setError(t('storageUnit.error.save'));
    }
  };

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
            value={warehouses.length}
            icon={<WarehouseIcon sx={{ color: 'white' }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('booking.title')}
            value="45"
            icon={<BookingIcon sx={{ color: 'white' }} />}
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Occupancy Rate"
            value="85%"
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

        {/* Warehouse Cards Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Your Warehouses
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {warehouses.map((warehouse) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={warehouse.warehouseId}>
                <WarehouseCard warehouse={warehouse} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AddWarehouseCard onClick={handleAddWarehouse} />
            </Grid>
          </Grid>
        </Grid>

        {/* Storage Units Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Your Storage Units
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {storageUnits.map((unit) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={unit.unitId}>
                <StorageUnitCard storageUnit={unit} />
              </Grid>
            ))}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <AddStorageUnitCard onClick={handleAddStorageUnit} />
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Placeholder for activity list */}
              <Typography color="text.secondary">
                Activity list will be displayed here
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Temperature Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Temperature Overview
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Placeholder for temperature chart */}
              <Typography color="text.secondary">
                Temperature chart will be displayed here
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {t('Add New Warehouse')}
        </DialogTitle>
        <DialogContent>
          <WarehouseForm
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>

      <StorageUnitForm
        open={openStorageUnitDialog}
        onClose={() => setOpenStorageUnitDialog(false)}
        onSubmit={handleStorageUnitSubmit}
        warehouses={warehouses}
        initialData={selectedUnit}
      />
    </Box>
  );
};

export default Home; 