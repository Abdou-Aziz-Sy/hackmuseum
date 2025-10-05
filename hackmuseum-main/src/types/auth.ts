export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Reservation {
  id: string;
  userId: string;
  visitDate: Date;
  timeSlot: string;
  numberOfVisitors: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'new_artwork' | 'reservation_confirmed' | 'reservation_cancelled' | 'general';
  isRead: boolean;
  createdAt: Date;
}
