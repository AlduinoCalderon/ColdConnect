import { create, getAll, getById, update, remove } from './api';
import { IotSensor, IotReading } from '../types';

const IOT_ENDPOINT = '/iot';

export const iotService = {
  // Sensor operations
  getAllSensors: async () => {
    try {
      const response = await getAll<IotSensor[]>(`${IOT_ENDPOINT}/sensors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensors:', error);
      throw error;
    }
  },

  getSensorById: async (id: number) => {
    try {
      const response = await getById<IotSensor>(`${IOT_ENDPOINT}/sensors`, id);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor by ID:', error);
      throw error;
    }
  },

  getSensorsByUnitId: async (unitId: number) => {
    try {
      const response = await getAll<IotSensor[]>(`${IOT_ENDPOINT}/sensors/unit/${unitId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensors by unit:', error);
      throw error;
    }
  },

  createSensor: async (data: Omit<IotSensor, 'sensorId' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const response = await create<IotSensor>(`${IOT_ENDPOINT}/sensors`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating sensor:', error);
      throw error;
    }
  },

  updateSensor: async (id: number, data: Partial<IotSensor>) => {
    try {
      const response = await update<IotSensor>(`${IOT_ENDPOINT}/sensors`, id, data);
      return response.data;
    } catch (error) {
      console.error('Error updating sensor:', error);
      throw error;
    }
  },

  deleteSensor: async (id: number) => {
    try {
      await remove(`${IOT_ENDPOINT}/sensors`, id);
    } catch (error) {
      console.error('Error deleting sensor:', error);
      throw error;
    }
  },

  // Reading operations
  getReadingsBySensorId: async (sensorId: number, startDate?: string, endDate?: string) => {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      
      const response = await getAll<IotReading[]>(
        `${IOT_ENDPOINT}/readings/sensor/${sensorId}?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching readings:', error);
      throw error;
    }
  },

  getLatestReadingsByUnitId: async (unitId: number) => {
    try {
      const response = await getAll<IotReading[]>(`${IOT_ENDPOINT}/readings/unit/${unitId}/latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest readings:', error);
      throw error;
    }
  },

  createReading: async (data: Omit<IotReading, 'readingId'>) => {
    try {
      const response = await create<IotReading>(`${IOT_ENDPOINT}/readings`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating reading:', error);
      throw error;
    }
  },

  // Alert operations
  checkTemperatureAlerts: async () => {
    try {
      const response = await getAll<{ sensorId: number; value: number; threshold: number }[]>(
        `${IOT_ENDPOINT}/alerts/temperature`
      );
      return response.data;
    } catch (error) {
      console.error('Error checking temperature alerts:', error);
      throw error;
    }
  },

  checkHumidityAlerts: async () => {
    try {
      const response = await getAll<{ sensorId: number; value: number; threshold: number }[]>(
        `${IOT_ENDPOINT}/alerts/humidity`
      );
      return response.data;
    } catch (error) {
      console.error('Error checking humidity alerts:', error);
      throw error;
    }
  },
}; 