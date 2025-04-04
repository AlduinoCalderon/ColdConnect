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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import WarehouseTable from '../components/warehouse/WarehouseTable';
import { Warehouse, warehouseService } from '../services/warehouseService';
import WarehouseForm from '../components/warehouse/WarehouseForm';

const Warehouses: React.FC = () => {
  const { t } = useTranslation();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await warehouseService.getAll();
      setWarehouses(data);
    } catch (err) {
      console.error('Error fetching warehouses:', err);
      setError(t('warehouse.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleCreate = () => {
    setSelectedWarehouse(null);
    setOpenDialog(true);
  };

  const handleEdit = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await warehouseService.delete(id);
      setWarehouses(warehouses.filter(w => w.warehouseId !== id));
    } catch (err) {
      console.error('Error deleting warehouse:', err);
      setError(t('warehouse.error.delete'));
    }
  };

  const handleSubmit = async (data: Omit<Warehouse, 'warehouseId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      if (selectedWarehouse) {
        await warehouseService.update(selectedWarehouse.warehouseId, data);
        setWarehouses(warehouses.map(w => 
          w.warehouseId === selectedWarehouse.warehouseId ? { ...w, ...data } : w
        ));
      } else {
        const newWarehouse = await warehouseService.create(data);
        setWarehouses([...warehouses, newWarehouse]);
      }
      setOpenDialog(false);
      setError(null);
    } catch (err) {
      console.error('Error saving warehouse:', err);
      setError(t('warehouse.error.save'));
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {t('warehouse.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          {t('warehouse.add')}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <WarehouseTable
        warehouses={warehouses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedWarehouse ? t('Edit Existing Warehouse') : t('Create New Warehouse')}
        </DialogTitle>
        <DialogContent>
          <WarehouseForm
            warehouse={selectedWarehouse}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Warehouses; 