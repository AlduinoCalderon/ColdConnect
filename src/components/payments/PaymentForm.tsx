import React, { useState } from 'react';
import { DialogContent, DialogActions, TextField, MenuItem, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Payment } from '../../services/paymentService';

interface PaymentFormProps {
  payment?: Payment | null;
  onSubmit: (data: Omit<Payment, 'paymentId' | 'createdAt' | 'updatedAt'>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    bookingId: payment?.bookingId || 0, // Ensure it's a number
    amount: payment?.amount || 0, // Ensure it's a number
    paymentMethod: payment?.paymentMethod || 'credit_card',
    status: payment?.status || 'pending',
    transactionId: payment?.transactionId || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'bookingId' || name === 'amount' ? Number(value) : value, // Convert to number
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      bookingId: Number(formData.bookingId), // Ensure correct type
      amount: Number(formData.amount), // Ensure correct type
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          fullWidth
          label={t('payment.bookingId')}
          name="bookingId"
          value={formData.bookingId}
          onChange={handleChange}
          margin="dense"
          required
        />
        <TextField
          fullWidth
          label={t('payment.amount')}
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          margin="dense"
          required
        />
        <TextField
          fullWidth
          select
          label={t('payment.method')}
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          margin="dense"
        >
          <MenuItem value="credit_card">Credit Card</MenuItem>
          <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
          <MenuItem value="paypal">PayPal</MenuItem>
        </TextField>
        <TextField
          fullWidth
          select
          label={t('payment.status')}
          name="status"
          value={formData.status}
          onChange={handleChange}
          margin="dense"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="refunded">Refunded</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label={t('payment.transactionId')}
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={() => setFormData({
            bookingId: 0, // Cambiar de '' a 0
            amount: 0, // Cambiar de '' a 0
            paymentMethod: 'credit_card',
            status: 'pending',
            transactionId: '',
            })}>
            {t('common.cancel')}
        </Button>

        <Button type="submit" variant="contained" color="primary">
          {t('common.save')}
        </Button>
      </DialogActions>
    </form>
  );
};

export default PaymentForm;
