import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  Divider,
} from '@mui/material';
import { Warehouse, warehouseService } from '../../services/warehouseService';
import { useTranslation } from 'react-i18next';
import {
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  CalendarToday as DateIcon,
} from '@mui/icons-material';

interface WarehouseCardProps {
  warehouse: Warehouse;
  onEdit?: (warehouse: Warehouse) => void;
  onDelete?: (id: number) => void;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (onDelete) {
      setLoading(true);
      try {
        await warehouseService.delete(warehouse.warehouseId);
        onDelete(warehouse.warehouseId);
      } catch (error) {
        console.error('Error deleting warehouse:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'closed':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            {warehouse.name}
          </Typography>
          <Chip
            label={t(`warehouse.statusTypes.${warehouse.status}`)}
            color={getStatusColor(warehouse.status)}
            size="small"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocationIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {warehouse.address}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TimeIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {Object.entries(warehouse.operatingHours).map(([day, hours]) => (
                  <span key={day}>
                    {t(`days.${day}`)}: {hours.open}-{hours.close}
                  </span>
                ))}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <DateIcon color="action" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                {t('warehouse.created')}: {formatDate(warehouse.createdAt)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {t('warehouse.amenities')}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {warehouse.amenities.map((amenity, index) => (
                <Chip 
                  key={index} 
                  label={t(`warehouse.amenitiesTypes.${amenity}`)} 
                  size="small" 
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => onEdit?.(warehouse)}
          disabled={loading}
        >
          {t('common.edit')}
        </Button>
        <Button
          size="small"
          color="error"
          onClick={handleDelete}
          disabled={loading}
        >
          {t('common.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default WarehouseCard; 