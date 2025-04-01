import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Warehouse } from '../services/warehouseService';
import { useNavigate } from 'react-router-dom';

const WarehouseCard: React.FC<{ warehouse: Warehouse }> = ({ warehouse }) => {
  // Placeholder values for temperature and occupation until storage units data is available
  const placeholderTemperature = '-5°C';
  const placeholderOccupation = '75%';

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/warehouses/${warehouse.warehouseId}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        transition: 'transform 0.3s', 
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }} 
      onClick={handleClick}
    >
      <CardContent>
        <Box>
          <Typography variant="h6">{warehouse.name}</Typography>
          <Typography variant="body2">Address: {warehouse.address}</Typography>
          <Typography variant="body2">Status: {warehouse.status}</Typography>
          <Typography variant="body2">Occupation: {placeholderOccupation}</Typography>
          <Typography variant="body2">Temperature: {placeholderTemperature}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WarehouseCard; 