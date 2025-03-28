import { create, getAll, getById, update, remove } from './api';
import { Notification } from '../types';

const NOTIFICATION_ENDPOINT = '/notifications';

export const notificationService = {
  getAll: async () => {
    try {
      const response = await getAll<Notification[]>(NOTIFICATION_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await getById<Notification>(NOTIFICATION_ENDPOINT, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching notification by ID:', error);
      throw error;
    }
  },

  getByUserId: async (userId: number) => {
    try {
      const response = await getAll<Notification[]>(`${NOTIFICATION_ENDPOINT}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications by user:', error);
      throw error;
    }
  },

  create: async (data: Omit<Notification, 'notificationId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const response = await create<Notification>(NOTIFICATION_ENDPOINT, data);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  update: async (id: number, data: Partial<Notification>) => {
    try {
      const response = await update<Notification>(NOTIFICATION_ENDPOINT, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      await remove(NOTIFICATION_ENDPOINT, id);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  markAsRead: async (id: number) => {
    try {
      const response = await update<Notification>(`${NOTIFICATION_ENDPOINT}/read`, id, { isRead: true });
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  markAllAsRead: async (userId: number) => {
    try {
      const response = await update<{ count: number }>(`${NOTIFICATION_ENDPOINT}/read-all`, userId, {});
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  getUnreadCount: async (userId: number) => {
    try {
      const response = await getAll<{ count: number }>(`${NOTIFICATION_ENDPOINT}/unread-count/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching unread notification count:', error);
      throw error;
    }
  },
}; 