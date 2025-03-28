import { create, getAll, getById, update, remove } from './api';

export interface Warehouse {
  warehouseId: number;
  ownerId: number;
  name: string;
  status: 'active' | 'maintenance' | 'closed';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  location: {
    type: string;
    coordinates: [number, number];
  };
  address: string;
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  amenities: string[];
}

const WAREHOUSE_ENDPOINT = '/warehouses';

export const warehouseService = {
  getAll: async () => {
    try {
      const response = await getAll<Warehouse[]>(WAREHOUSE_ENDPOINT);
      console.log('API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      throw error;
    }
  },
  getById: async (id: number) => {
    try {
      const response = await getById<Warehouse>(WAREHOUSE_ENDPOINT, id);
      console.log('API Response for ID:', id, response);
      return response.data;
    } catch (error) {
      console.error('Error fetching warehouse by ID:', error);
      throw error;
    }
  },
  create: async (data: Omit<Warehouse, 'warehouseId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      console.log('Creating warehouse with data:', data);
      const response = await create<Warehouse>(WAREHOUSE_ENDPOINT, data);
      console.log('Create API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating warehouse:', error);
      throw error;
    }
  },
  update: async (id: number, data: Partial<Warehouse>) => {
    try {
      console.log('Updating warehouse with ID:', id, 'and data:', data);
      const response = await update<Warehouse>(WAREHOUSE_ENDPOINT, id, data);
      console.log('Update API Response:', response);
      return response.data;
    } catch (error) {
      console.error('Error updating warehouse:', error);
      throw error;
    }
  },
  delete: async (id: number) => {
    try {
      console.log('Deleting warehouse with ID:', id);
      await remove(WAREHOUSE_ENDPOINT, id);
      console.log('Delete successful');
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      throw error;
    }
  },
}; 