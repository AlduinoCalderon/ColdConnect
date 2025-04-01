import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { warehouseService, Warehouse } from '../services/warehouseService';

const WarehouseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await warehouseService.getById(Number(id));
        setWarehouse(data);
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
    </Container>
  );
};

export default WarehouseDetails; 