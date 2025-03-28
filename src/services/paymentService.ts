import { create, getAll, getById, update, remove } from './api';
import { Payment } from '../types';

const PAYMENT_ENDPOINT = '/payments';

export const paymentService = {
  getAll: async () => {
    try {
      const response = await getAll<Payment[]>(PAYMENT_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<Payment>(PAYMENT_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment by ID:', error);
      throw error;
    }
  },

  getByBookingId: async (bookingId: number) => {
    try {
      const response = await getAll<Payment[]>(`${PAYMENT_ENDPOINT}/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments by booking:', error);
      throw error;
    }
  },

  create: async (data: Omit<Payment, 'paymentId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await create<Payment>(PAYMENT_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<Payment>) => {
    try {
      const response = await update<Payment>(PAYMENT_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(PAYMENT_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  },

  updateStatus: async (id: number, status: Payment['status']) => {
    try {
      const response = await update<Payment>(`${PAYMENT_ENDPOINT}/status`, id, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }
  },

  processRefund: async (id: number) => {
    try {
      const response = await update<Payment>(`${PAYMENT_ENDPOINT}/refund`, id, {});
      return response.data;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  },
}; 