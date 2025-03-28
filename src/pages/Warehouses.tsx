import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Thermostat as ThermostatIcon,
  WaterDrop as HumidityIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Mock data for demonstration
const mockWarehouses = [
  {
    id: 1,
    name: 'Main Warehouse',
    location: 'New York',
    temperature: -18,
    humidity: 45,
    capacity: '85%',
    status: 'active',
  },
  {
    id: 2,
    name: 'Secondary Storage',
    location: 'Los Angeles',
    temperature: -20,
    humidity: 40,
    capacity: '60%',
    status: 'active',
  },
  {
    id: 3,
    name: 'Distribution Center',
    location: 'Chicago',
    temperature: -15,
    humidity: 50,
    capacity: '95%',
    status: 'warning',
  },
];

const WarehouseCard: React.FC<{
  warehouse: typeof mockWarehouses[0];
}> = ({ warehouse }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {warehouse.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {warehouse.location}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThermostatIcon color="primary" />
              <Typography variant="body2">
                {warehouse.temperature}°C
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HumidityIcon color="primary" />
              <Typography variant="body2">
                {warehouse.humidity}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorageIcon color="primary" />
              <Typography variant="body2">
                {warehouse.capacity} {t('warehouse.capacity')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Chip
            label={warehouse.status}
            color={warehouse.status === 'active' ? 'success' : 'warning'}
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
        <IconButton size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const Warehouses: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          {t('warehouse.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* TODO: Implement add warehouse */}}
        >
          {t('warehouse.add')}
        </Button>
      </Box>

      {isMobile ? (
        <Grid container spacing={3}>
          {mockWarehouses.map((warehouse) => (
            <Grid item xs={12} key={warehouse.id}>
              <WarehouseCard warehouse={warehouse} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('warehouse.details')}</TableCell>
                <TableCell align="right">{t('warehouse.temperature')}</TableCell>
                <TableCell align="right">{t('warehouse.humidity')}</TableCell>
                <TableCell align="right">{t('warehouse.capacity')}</TableCell>
                <TableCell align="right">{t('warehouse.status')}</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockWarehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell component="th" scope="row">
                    <Box>
                      <Typography variant="subtitle1">{warehouse.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {warehouse.location}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <ThermostatIcon color="primary" />
                      {warehouse.temperature}°C
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <HumidityIcon color="primary" />
                      {warehouse.humidity}%
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      <StorageIcon color="primary" />
                      {warehouse.capacity}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={warehouse.status}
                      color={warehouse.status === 'active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Warehouses; 