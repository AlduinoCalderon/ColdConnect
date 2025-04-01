import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Warehouse } from '../../types';

interface WarehouseCardProps {
  warehouse: Warehouse;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        transition: 'transform 0.3s', 
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }} 
      onClick={() => { /* No flip effect, just show info */ }}
    >
      <CardContent>
        <Box>
          <Typography variant="h6">{warehouse.name}</Typography>
          <Typography variant="body2">Address: {warehouse.address}</Typography>
          <Typography variant="body2">Occupation: {warehouse.occupation || 'Information not available'}</Typography>
          <Typography variant="body2">Temperature: {warehouse.temperature || 'Information not available'}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WarehouseCard; 