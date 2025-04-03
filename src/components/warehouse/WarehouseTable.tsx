import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Warehouse } from '../../services/warehouseService';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

interface WarehouseTableProps {
  warehouses: Warehouse[];
  onEdit?: (warehouse: Warehouse) => void;
  onDelete?: (id: number) => void;
}

const WarehouseTable: React.FC<WarehouseTableProps> = ({
  warehouses,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'closed':
        return 'error';
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.name')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.status')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.address')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.amenities')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.created')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }} align="right">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((warehouse, index) => (
            <TableRow 
              key={warehouse.warehouseId} 
              sx={{ 
                backgroundColor: index % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper, 
                '&:hover': { backgroundColor: theme.palette.action.selected } 
              }}
            >
              <TableCell>{warehouse.name}</TableCell>
              <TableCell>
                <Chip
                  label={t(`warehouse.statusTypes.${warehouse.status}`)}
                  color={getStatusColor(warehouse.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>{warehouse.address}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {warehouse.amenities.map((amenity, index) => (
                    <Chip
                      key={index}
                      label={t(`warehouse.amenitiesTypes.${amenity}`)}
                      size="small"
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell>{formatDate(warehouse.createdAt)}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  onClick={() => onEdit?.(warehouse)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete?.(warehouse.warehouseId)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WarehouseTable; 