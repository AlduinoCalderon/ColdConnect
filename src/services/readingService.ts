import { create, getAll, getById, update, remove } from './api';
import { Reading } from '../types';

const READING_ENDPOINT = '/mongodb/readings';

export const readingService = {
  getAll: async (sensorType?: Reading['sensorType'], limit: number = 100) => {
    try {
      const response = await getAll<Reading[]>(`${READING_ENDPOINT}?sensorType=${sensorType}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching readings:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<Reading>(READING_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching reading by ID:', error);
      throw error;
    }
  },

  getByUnitId: async (unitId: number, sensorType?: Reading['sensorType'], limit: number = 100) => {
    try {
      const response = await getAll<Reading[]>(`${READING_ENDPOINT}/unit/${unitId}?sensorType=${sensorType}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching readings by unit:', error);
      throw error;
    }
  },

  getLatestByUnitId: async (unitId: number) => {
    try {
      const response = await getById<Reading>(`${READING_ENDPOINT}/unit/${unitId}/latest`, 0);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest reading for unit:', error);
      throw error;
    }
  },

  getLatestReadings: async (sensorType: Reading['sensorType'] = 'temperature', limit: number = 100) => {
    try {
      const response = await getAll<Reading[]>(`${READING_ENDPOINT}?sensorType=${sensorType}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest readings:', error);
      throw error;
    }
  },

  create: async (data: Omit<Reading, '_id'>) => {
    try {
      const response = await create<Reading>(READING_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating reading:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<Reading>) => {
    try {
      const response = await update<Reading>(READING_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating reading:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(READING_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting reading:', error);
      throw error;
    }
  }
}; 