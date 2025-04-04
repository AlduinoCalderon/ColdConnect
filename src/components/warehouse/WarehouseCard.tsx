import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Warehouse } from '../../services/warehouseService';
import { useTranslation } from 'react-i18next';

interface WarehouseCardProps {
  warehouse: Warehouse;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse }) => {
  const { t } = useTranslation();

  return (
    <Card 
      sx={{ 
        height: '100%', 
        transition: 'transform 0.3s', 
        '&:hover': {
          transform: 'scale(1.05)',
        }
      }} 
    >
      <CardContent>
        <Box>
          <Typography variant="h6">{warehouse.name}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Address: {warehouse.address}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip 
              label={t(`warehouse.statusTypes.${warehouse.status}`)}
              color={
                warehouse.status === 'active' ? 'success' :
                warehouse.status === 'maintenance' ? 'warning' :
                'error'
              }
              size="small"
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {warehouse.amenities?.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity.type}
                color={amenity.available ? 'success' : 'default'}
                size="small"
                variant="outlined"
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {t('warehouse.operatingHours')}:
            {warehouse.operatingHours?.weekdays?.map((day, index) => (
              <Box key={index} component="span" sx={{ display: 'block', fontSize: '0.75rem' }}>
                {day.day}: {day.open} - {day.close}
              </Box>
            ))}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WarehouseCard; 