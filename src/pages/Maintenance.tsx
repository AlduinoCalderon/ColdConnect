import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Maintenance } from '../types';
import { maintenanceService } from '../services/maintenanceService';

const MaintenancePage: React.FC = () => {
  const { t } = useTranslation();
  const [maintenanceRecords, setMaintenanceRecords] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Maintenance | null>(null);

  const fetchMaintenanceRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await maintenanceService.getAll();
      setMaintenanceRecords(data);
    } catch (err) {
      console.error('Error fetching maintenance records:', err);
      setError(t('maintenance.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceRecords();
  }, []);

  const handleCreate = () => {
    setSelectedRecord(null);
    setOpenDialog(true);
  };

  const handleEdit = (record: Maintenance) => {
    setSelectedRecord(record);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await maintenanceService.delete(id);
      setMaintenanceRecords(maintenanceRecords.filter(r => r.maintenanceId !== id));
    } catch (err) {
      console.error('Error deleting maintenance record:', err);
      setError(t('maintenance.error.delete'));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: Maintenance['type']) => {
    switch (type) {
      case 'preventive':
        return 'success';
      case 'corrective':
        return 'warning';
      case 'emergency':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Maintenance['priority']) => {
    switch (priority) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('maintenance.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          {t('maintenance.add')}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('maintenance.id')}</TableCell>
              <TableCell>{t('maintenance.type')}</TableCell>
              <TableCell>{t('maintenance.status')}</TableCell>
              <TableCell>{t('maintenance.priority')}</TableCell>
              <TableCell>{t('maintenance.description')}</TableCell>
              <TableCell>{t('maintenance.startDate')}</TableCell>
              <TableCell>{t('maintenance.endDate')}</TableCell>
              <TableCell align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceRecords.map((record) => (
              <TableRow key={record.maintenanceId}>
                <TableCell>{record.maintenanceId}</TableCell>
                <TableCell>
                  <Chip
                    label={t(`maintenance.types.${record.type}`)}
                    color={getTypeColor(record.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={t(`maintenance.statusTypes.${record.status}`)}
                    color={getStatusColor(record.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={t(`maintenance.priorities.${record.priority}`)}
                    color={getPriorityColor(record.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>
                  {new Date(record.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {record.endDate ? new Date(record.endDate).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(record)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(record.maintenanceId)}
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

      {/* TODO: Add MaintenanceForm dialog component */}
    </Container>
  );
};

export default MaintenancePage; 