import { create, getAll, getById, update, remove } from './api';
import { Maintenance } from '../types';

const MAINTENANCE_ENDPOINT = '/maintenance';

export const maintenanceService = {
  getAll: async () => {
    try {
      const response = await getAll<Maintenance[]>(MAINTENANCE_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching maintenance records:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<Maintenance>(MAINTENANCE_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching maintenance record by ID:', error);
      throw error;
    }
  },

  getByUnitId: async (unitId: number) => {
    try {
      const response = await getAll<Maintenance[]>(`${MAINTENANCE_ENDPOINT}/unit/${unitId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching maintenance records by unit:', error);
      throw error;
    }
  },

  create: async (data: Omit<Maintenance, 'maintenanceId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const response = await create<Maintenance>(MAINTENANCE_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating maintenance record:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<Maintenance>) => {
    try {
      const response = await update<Maintenance>(MAINTENANCE_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating maintenance record:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(MAINTENANCE_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting maintenance record:', error);
      throw error;
    }
  },

  updateStatus: async (id: number, status: Maintenance['status']) => {
    try {
      const response = await update<Maintenance>(`${MAINTENANCE_ENDPOINT}/status`, id, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      throw error;
    }
  },

  scheduleMaintenance: async (data: {
    unitId: number;
    scheduledDate: string;
    description: string;
    priority: Maintenance['priority'];
  }) => {
    try {
      const response = await create<Maintenance>(`${MAINTENANCE_ENDPOINT}/schedule`, data);
      return response.data;
    } catch (error) {
      console.error('Error scheduling maintenance:', error);
      throw error;
    }
  },
}; 