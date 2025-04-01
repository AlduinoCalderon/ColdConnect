import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddWarehouseCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f0f0',
        }
      }} 
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AddIcon sx={{ fontSize: 40 }} />
          <Typography variant="h6">Add Warehouse</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddWarehouseCard; 