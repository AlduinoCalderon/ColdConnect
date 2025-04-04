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
  Box,
  useTheme,
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
  const theme = useTheme();

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
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.common.white }}>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.name')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.status')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.address')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.amenities')}</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>{t('warehouse.operatingHours')}</TableCell>
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
                <Box 
                  sx={{ 
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: 
                      warehouse.status === 'active' ? theme.palette.success.light :
                      warehouse.status === 'maintenance' ? theme.palette.warning.light :
                      theme.palette.error.light,
                    //color: 
                      //warehouse.status === 'active' ? theme.palette.success.dark :
                      //warehouse.status === 'maintenance' ? theme.palette.warning.dark :
                      //theme.palette.error.dark,
                    textTransform: 'capitalize',
                    fontWeight: 'medium'
                  }}
                >
                  {t(`warehouse.statusTypes.${warehouse.status}`)}
                </Box>
              </TableCell>
              <TableCell>{warehouse.address}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {warehouse.amenities?.map((amenity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.secondary.dark,
                        textTransform: 'capitalize',
                        fontSize: '0.75rem'
                      }}
                    >
                      {amenity.type} - {amenity.available ? 'Available' : 'Not Available'}: {amenity.description}
                    </Box>
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {warehouse.operatingHours?.weekdays?.map((day, index) => (
                    <Box
                      key={index}
                      sx={{
                        fontSize: '0.75rem',
                        color: theme.palette.text.secondary
                      }}
                    >
                      {day.day}: {day.open} - {day.close}
                    </Box>
                  ))}
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => onEdit?.(warehouse)}
                  title={t('common.edit')}
                  color="primary"
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