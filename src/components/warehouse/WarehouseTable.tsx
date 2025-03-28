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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('warehouse.name')}</TableCell>
            <TableCell>{t('warehouse.status')}</TableCell>
            <TableCell>{t('warehouse.address')}</TableCell>
            <TableCell>{t('warehouse.amenities')}</TableCell>
            <TableCell>{t('warehouse.created')}</TableCell>
            <TableCell align="right">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((warehouse) => (
            <TableRow key={warehouse.warehouseId}>
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
                  size="small"
                  onClick={() => onEdit?.(warehouse)}
                  title={t('common.edit')}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete?.(warehouse.warehouseId)}
                  title={t('common.delete')}
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