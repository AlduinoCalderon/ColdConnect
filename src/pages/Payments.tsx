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
import { Payment } from '../types';
import { paymentService } from '../services/paymentService';

const Payments: React.FC = () => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await paymentService.getAll();
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(t('payment.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleCreate = () => {
    setSelectedPayment(null);
    setOpenDialog(true);
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await paymentService.delete(id);
      setPayments(payments.filter(p => p.paymentId !== id));
    } catch (err) {
      console.error('Error deleting payment:', err);
      setError(t('payment.error.delete'));
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPaymentMethodColor = (method: Payment['paymentMethod']) => {
    switch (method) {
      case 'credit_card':
        return 'primary';
      case 'bank_transfer':
        return 'secondary';
      case 'paypal':
        return 'info';
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
          {t('payment.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          {t('payment.add')}
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
              <TableCell>{t('payment.id')}</TableCell>
              <TableCell>{t('payment.booking')}</TableCell>
              <TableCell>{t('payment.amount')}</TableCell>
              <TableCell>{t('payment.method')}</TableCell>
              <TableCell>{t('payment.status')}</TableCell>
              <TableCell>{t('payment.date')}</TableCell>
              <TableCell align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.paymentId}>
                <TableCell>{payment.paymentId}</TableCell>
                <TableCell>{payment.bookingId}</TableCell>
                <TableCell>
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={t(`payment.methods.${payment.paymentMethod}`)}
                    color={getPaymentMethodColor(payment.paymentMethod)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={t(`payment.statusTypes.${payment.status}`)}
                    color={getStatusColor(payment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(payment)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(payment.paymentId)}
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

      {/* TODO: Add PaymentForm dialog component */}
    </Container>
  );
};

export default Payments; 