import { create, getAll, getById, update, remove } from './api';
import { User } from '../types';

const USER_ENDPOINT = '/users';

export const userService = {
  getAll: async () => {
    try {
      const response = await getAll<User[]>(USER_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<User>(USER_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  create: async (data: Omit<User, 'userId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const response = await create<User>(USER_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<User>) => {
    try {
      const response = await update<User>(USER_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(USER_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
}; 