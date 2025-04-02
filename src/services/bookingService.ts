import { create, getAll, getById, update, remove } from './api';
import { Booking, BookingUnit } from '../types';


// Hace una instancia, y luego llama POST, GET, PUT, DELETE
const BOOKING_ENDPOINT = '/bookings';

export const bookingService = {
  getAll: async () => {
    try {
      const response = await getAll<Booking[]>(BOOKING_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<Booking>(BOOKING_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking by ID:', error);
      throw error;
    }
  },

  getByCustomerId: async (customerId: number) => {
    try {
      const response = await getAll<Booking[]>(`${BOOKING_ENDPOINT}/customer/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by customer:', error);
      throw error;
    }
  },

  getByWarehouseId: async (warehouseId: number) => {
    try {
      const response = await getAll<Booking[]>(`${BOOKING_ENDPOINT}/warehouse/${warehouseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings by warehouse:', error);
      throw error;
    }
  },

  create: async (data: Omit<Booking, 'bookingId' | 'createdAt' | 'updatedAt' | 'deletedAt'> & {
    units: { unitId: number; pricePerHour: number }[];
  }) => {
    try {
      const response = await create<Booking>(BOOKING_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<Booking>) => {
    try {
      const response = await update<Booking>(BOOKING_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(BOOKING_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  updateStatus: async (id: number, status: Booking['status']) => {
    try {
      const response = await update<Booking>(BOOKING_ENDPOINT, id, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  getBookingUnits: async (bookingId: number) => {
    try {
      const response = await getAll<BookingUnit[]>(`${BOOKING_ENDPOINT}/${bookingId}/units`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking units:', error);
      throw error;
    }
  },
}; 