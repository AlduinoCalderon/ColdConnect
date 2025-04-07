import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface AddStorageUnitCardProps {
  onClick: () => void;
}

const AddStorageUnitCard: React.FC<AddStorageUnitCardProps> = ({ onClick }) => {
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

export default AddStorageUnitCard;
