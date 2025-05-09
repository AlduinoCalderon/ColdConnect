export interface User {
  userId: number;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'owner' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Reading {
  _id: string;
  unitId: string;
  sensorType: 'temperature' | 'humidity' | 'proximity1' | 'proximity2' | 'motion' | 'door';
  value: number;
  timestamp: string;
}

export interface StorageUnit {
  unitId: number;
  warehouseId: number;
  name: string;
  width: number;
  height: number;
  depth: number;
  costPerHour: number;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Booking {
  bookingId: number;
  customerId: number;
  warehouseId: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  units: { unitId: number; pricePerHour: number }[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BookingUnit {
  bookingId: number;
  unitId: number;
  pricePerHour: number;
}

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

export interface IotSensor {
  sensorId: number;
  unitId: number;
  sensorType: 'temperature' | 'humidity' | 'motion' | 'door';
  status: 'active' | 'inactive' | 'error';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IotReading {
  readingId: number;
  sensorId: number;
  value: number;
  recordedAt: string;
}

export interface Maintenance {
  maintenanceId: number;
  warehouseId: number;
  unitId?: number;
  type: 'preventive' | 'corrective' | 'emergency';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  startDate: string;
  endDate?: string;
  downtimeHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  notificationId: number;
  userId: number;
  type: 'alert' | 'payment' | 'maintenance' | 'booking';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Warehouse {
  warehouseId: number;
  name: string;
  address: string;
  status: 'active' | 'maintenance' | 'closed';
  amenities: Array<{
    type: string;
    available: boolean;
    description: string;
  }>;
  operatingHours: {
    weekdays: Array<{
      day: string;
      open: string;
      close: string;
    }>;
  };
  location: {
    x: number;
    y: number;
  };
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
} 