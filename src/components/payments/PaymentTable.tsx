import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Payment } from '../../services/paymentService';
import { useTranslation } from 'react-i18next';

interface PaymentTableProps {
  payments: Payment[];
  onEdit: (payment: Payment) => void;
  onDelete: (id: number) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onEdit, onDelete }) => {
  const { t } = useTranslation();

  const formatAmount = (amount: any) => {
    const numAmount = Number(amount);
    return isNaN(numAmount) ? '0.00' : numAmount.toFixed(2);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('payment.id')}</TableCell>
            <TableCell>{t('payment.bookingId')}</TableCell>
            <TableCell>{t('payment.amount')}</TableCell>
            <TableCell>{t('payment.method')}</TableCell>
            <TableCell>{t('payment.status')}</TableCell>
            <TableCell>{t('payment.transactionId')}</TableCell>
            <TableCell>{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.paymentId}>
              <TableCell>{payment.paymentId}</TableCell>
              <TableCell>{payment.bookingId}</TableCell>
              <TableCell>${formatAmount(payment.amount)}</TableCell>
              <TableCell>{t(`payment.methods.${payment.paymentMethod}`)}</TableCell>
              <TableCell>{t(`payment.statusTypes.${payment.status}`)}</TableCell>
              <TableCell>{payment.transactionId || 'N/A'}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(payment)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(payment.paymentId)}>
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

export default PaymentTable;
