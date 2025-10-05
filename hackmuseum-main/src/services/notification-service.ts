import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'system' | 'user' | 'artwork' | 'reservation' | 'maintenance';
  actionUrl?: string;
  actionLabel?: string;
  dismissible?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
  clearByCategory: (category: Notification['category']) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
          read: false,
          dismissible: notification.dismissible ?? true,
          autoClose: notification.autoClose ?? false,
          autoCloseDelay: notification.autoCloseDelay ?? 5000,
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }));
        
        // Auto-close notification if configured
        if (newNotification.autoClose) {
          setTimeout(() => {
            get().removeNotification(newNotification.id);
          }, newNotification.autoCloseDelay);
        }
        
        return newNotification.id;
      },
      
      removeNotification: (id) => {
        const notification = get().notifications.find(n => n.id === id);
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id),
          unreadCount: notification && !notification.read 
            ? state.unreadCount - 1 
            : state.unreadCount,
        }));
      },
      
      markAsRead: (id) => {
        const notification = get().notifications.find(n => n.id === id);
        if (notification && !notification.read) {
          set((state) => ({
            notifications: state.notifications.map(n => 
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: state.unreadCount - 1,
          }));
        }
      },
      
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0,
        }));
      },
      
      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadCount: 0,
        });
      },
      
      clearByCategory: (category) => {
        const unreadInCategory = get().notifications.filter(
          n => n.category === category && !n.read
        ).length;
        
        set((state) => ({
          notifications: state.notifications.filter(n => n.category !== category),
          unreadCount: state.unreadCount - unreadInCategory,
        }));
      },
    }),
    {
      name: 'hackmuseum-notifications',
      partialize: (state) => ({ notifications: state.notifications }),
    }
  )
);

// Utility functions for creating notifications
export const notifySuccess = (title: string, message: string, options?: Partial<Notification>) => {
  return useNotificationStore.getState().addNotification({
    type: 'success',
    title,
    message,
    priority: 'medium',
    category: 'system',
    ...options,
  });
};

export const notifyError = (title: string, message: string, options?: Partial<Notification>) => {
  return useNotificationStore.getState().addNotification({
    type: 'error',
    title,
    message,
    priority: 'high',
    category: 'system',
    ...options,
  });
};

export const notifyWarning = (title: string, message: string, options?: Partial<Notification>) => {
  return useNotificationStore.getState().addNotification({
    type: 'warning',
    title,
    message,
    priority: 'medium',
    category: 'system',
    ...options,
  });
};

export const notifyInfo = (title: string, message: string, options?: Partial<Notification>) => {
  return useNotificationStore.getState().addNotification({
    type: 'info',
    title,
    message,
    priority: 'low',
    category: 'system',
    ...options,
  });
};

// Specialized notification functions
export const notifyArtworkCreated = (title: string, artworkName: string) => {
  return notifySuccess(
    title,
    `L'œuvre "${artworkName}" a été ajoutée avec succès.`,
    { 
      category: 'artwork',
      autoClose: true,
    }
  );
};

export const notifyArtworkUpdated = (artworkName: string) => {
  return notifySuccess(
    'Œuvre mise à jour',
    `L'œuvre "${artworkName}" a été mise à jour avec succès.`,
    { 
      category: 'artwork',
      autoClose: true,
    }
  );
};

export const notifyArtworkDeleted = (artworkName: string) => {
  return notifySuccess(
    'Œuvre supprimée',
    `L'œuvre "${artworkName}" a été supprimée avec succès.`,
    { 
      category: 'artwork',
      autoClose: true,
    }
  );
};

export const notifySystemMaintenance = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
  
  return notifyWarning(
    'Maintenance programmée',
    `Une maintenance du système est prévue le ${formattedDate}.`,
    {
      category: 'maintenance',
      priority: 'high',
      dismissible: false,
    }
  );
};

export const notifyNewReservation = (date: Date, groupName: string) => {
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
  
  return notifyInfo(
    'Nouvelle réservation',
    `Une visite de groupe "${groupName}" a été réservée pour le ${formattedDate}.`,
    {
      category: 'reservation',
      actionUrl: '/admin/reservations',
      actionLabel: 'Voir les détails',
    }
  );
};