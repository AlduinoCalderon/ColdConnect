import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Payment } from '../../services/paymentService';

interface PaymentTableProps {
  payments: Payment[];
  onEdit: (payment: Payment) => void;
  onDelete: (id: number) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Booking ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.paymentId}>
              <TableCell>{payment.paymentId}</TableCell>
              <TableCell>{payment.bookingId}</TableCell>
              <TableCell>${payment.amount.toFixed(2)}</TableCell>
              <TableCell>{payment.paymentMethod}</TableCell>
              <TableCell>{payment.status}</TableCell>
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
