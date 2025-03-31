import { create, getAll, getById, update, remove } from './api';

export interface Payment {
  paymentId: number;
  bookingId: number;
  amount: number;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paypal';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

const PAYMENT_ENDPOINT = '/payments';

export const paymentService = {
  getAll: async () => {
    try {
      const response = await getAll<Payment[]>(PAYMENT_ENDPOINT);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },
  getById: async (id: number) => {
    try {
      const response = await getById<Payment>(PAYMENT_ENDPOINT, id);
      console.log('API Response for ID:', id, response);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment by ID:', error);
      throw error;
    }
  },
  create: async (data: Omit<Payment, 'paymentId' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Creating payment with data:', data);
      const response = await create<Payment>(PAYMENT_ENDPOINT, data);
      console.log('Create API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  },
  update: async (id: number, data: Partial<Payment>) => {
    try {
      console.log('Updating payment with ID:', id, 'and data:', data);
      const response = await update<Payment>(PAYMENT_ENDPOINT, id, data);
      console.log('Update API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },
  delete: async (id: number) => {
    try {
      console.log('Deleting payment with ID:', id);
      await remove(PAYMENT_ENDPOINT, id);
      console.log('Delete successful');
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  },
};
