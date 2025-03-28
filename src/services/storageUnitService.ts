import { create, getAll, getById, update, remove } from './api';
import { StorageUnit } from '../types';

const STORAGE_UNIT_ENDPOINT = '/storage-units';

export const storageUnitService = {
  getAll: async () => {
    try {
      const response = await getAll<StorageUnit[]>(STORAGE_UNIT_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching storage units:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<StorageUnit>(STORAGE_UNIT_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching storage unit by ID:', error);
      throw error;
    }
  },

  getByWarehouseId: async (warehouseId: number) => {
    try {
      const response = await getAll<StorageUnit[]>(`${STORAGE_UNIT_ENDPOINT}/warehouse/${warehouseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching storage units by warehouse:', error);
      throw error;
    }
  },

  create: async (data: Omit<StorageUnit, 'unitId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const response = await create<StorageUnit>(STORAGE_UNIT_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating storage unit:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<StorageUnit>) => {
    try {
      const response = await update<StorageUnit>(STORAGE_UNIT_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating storage unit:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(STORAGE_UNIT_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting storage unit:', error);
      throw error;
    }
  },

  updateStatus: async (id: number, status: StorageUnit['status']) => {
    try {
      const response = await update<StorageUnit>(STORAGE_UNIT_ENDPOINT, id, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating storage unit status:', error);
      throw error;
    }
  },
}; 