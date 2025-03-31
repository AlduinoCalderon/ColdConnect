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
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PaymentTable from '../components/payments/PaymentTable';
import { paymentService } from '../services/paymentService';
import { Payment } from '../types';

import PaymentForm from '../components/payments/PaymentForm';

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

  const handleSubmit = async (data: Omit<Payment, 'paymentId' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (selectedPayment) {
        await paymentService.update(selectedPayment.paymentId, data);
        setPayments(payments.map(p => 
          p.paymentId === selectedPayment.paymentId ? { ...p, ...data } : p
        ));
      } else {
        const newPayment = await paymentService.create(data);
        setPayments([...payments, newPayment]);
      }
      setOpenDialog(false);
      setError(null);
    } catch (err) {
      console.error('Error saving payment:', err);
      setError(t('payment.error.save'));
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          {t('payment.title')}
        </Typography>
        <Button
          variant="contained"
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

      <PaymentTable
        payments={payments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPayment ? t('payment.edit') : t('payment.create')}
        </DialogTitle>
        <DialogContent>
          <PaymentForm
            payment={selectedPayment}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Payments;
