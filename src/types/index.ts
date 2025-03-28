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