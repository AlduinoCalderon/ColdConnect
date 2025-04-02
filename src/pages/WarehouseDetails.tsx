import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box } from '@mui/material';
import { warehouseService, Warehouse } from '../services/warehouseService';
import { storageUnitService } from '../services/storageUnitService';
import { StorageUnit } from '../types';


//aqui es a la que nos manda si le damos click al warehouse en el home
const WarehouseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await warehouseService.getById(Number(id));
        setWarehouse(data);
        // Fetch associated storage units
        const units = await storageUnitService.getByWarehouseId(Number(id));
        setStorageUnits(units);
      } catch (err) {
        console.error('Error fetching warehouse:', err);
        setError('Failed to fetch warehouse data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, [id]);

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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {warehouse?.name}
      </Typography>
      <Typography variant="body1">Address: {warehouse?.address}</Typography>
      <Typography variant="body1">Status: {warehouse?.status}</Typography>
      <Typography variant="body1">Created At: {warehouse?.createdAt}</Typography>
      <Typography variant="body1">Updated At: {warehouse?.updatedAt}</Typography>
      {/* Add more fields as necessary */}

      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Associated Storage Units
        </Typography>
        {storageUnits.length > 0 ? (
          <Box>
            {storageUnits.map((unit) => (
              <Typography key={unit.unitId} variant="body1">
                {unit.name} - {unit.status}
              </Typography>
            ))}
          </Box>
        ) : (
          <Alert severity="info">No storage units associated with this warehouse.</Alert>
        )}
      </Box>
    </Container>
  );
};

export default WarehouseDetails; 