import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { StorageUnit } from '../../types';

interface StorageUnitCardProps {
  storageUnit: StorageUnit;
}

const StorageUnitCard: React.FC<StorageUnitCardProps> = ({ storageUnit }) => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {storageUnit.name}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Dimensions: {storageUnit.width}m × {storageUnit.height}m × {storageUnit.depth}m
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temperature: {storageUnit.minTemp}°C - {storageUnit.maxTemp}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Humidity: {storageUnit.minHumidity}% - {storageUnit.maxHumidity}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cost: ${storageUnit.costPerHour}/hr
          </Typography>
          <Box
            sx={{
              mt: 1,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              backgroundColor:
                storageUnit.status === 'available' ? theme.palette.success.light :
                storageUnit.status === 'occupied' ? theme.palette.info.light :
                storageUnit.status === 'maintenance' ? theme.palette.warning.light :
                theme.palette.secondary.light,
              textTransform: 'capitalize',
              fontWeight: 'medium',
            }}
          >
            {storageUnit.status}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StorageUnitCard; 