import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { StorageUnit } from '../types';
import { storageUnitService } from '../services/storageUnitService';
import { useTheme } from '@mui/material/styles';

const StorageUnits: React.FC = () => {
  const { t } = useTranslation();
  const [units, setUnits] = useState<StorageUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<StorageUnit | null>(null);
  const theme = useTheme();

  const fetchUnits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await storageUnitService.getAll();
      setUnits(data);
    } catch (err) {
      console.error('Error fetching storage units:', err);
      setError(t('storageUnit.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleCreate = () => {
    setSelectedUnit(null);
    setOpenDialog(true);
  };

  const handleEdit = (unit: StorageUnit) => {
    setSelectedUnit(unit);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await storageUnitService.delete(id);
      setUnits(units.filter(u => u.unitId !== id));
    } catch (err) {
      console.error('Error deleting storage unit:', err);
      setError(t('storageUnit.error.delete'));
    }
  };

  const getStatusColor = (status: StorageUnit['status']) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'info';
      case 'maintenance':
        return 'warning';
      case 'reserved':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('storageUnit.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          {t('storageUnit.add')}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.name')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.warehouse')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.dimensions')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.temperature')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.humidity')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.cost')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('storageUnit.status')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }} align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit, index) => (
              <TableRow 
                key={unit.unitId} 
                sx={{ 
                  backgroundColor: index % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper, 
                  '&:hover': { backgroundColor: theme.palette.action.selected } 
                }}
              >
                <TableCell>{unit.name}</TableCell>
                <TableCell>{unit.warehouseId}</TableCell>
                <TableCell>
                  {unit.width}m × {unit.height}m × {unit.depth}m
                </TableCell>
                <TableCell>
                  {unit.minTemp}°C - {unit.maxTemp}°C
                </TableCell>
                <TableCell>
                  {unit.minHumidity}% - {unit.maxHumidity}%
                </TableCell>
                <TableCell>
                  ${unit.costPerHour}/hr
                </TableCell>
                <TableCell>
                  <Chip
                    label={t(`storageUnit.statusTypes.${unit.status}`)}
                    color={getStatusColor(unit.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(unit)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(unit.unitId)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* TODO: Add StorageUnitForm dialog component */}
    </Container>
  );
};

export default StorageUnits; 