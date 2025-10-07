import { create } from 'zustand';
import { useNotificationStore } from './notification-service';

// Types pour les réservations
export interface Reservation {
  id: string;
  visitorName: string;
  visitorEmail: string;
  userId?: string; // ID de l'utilisateur connecté
  date: string;
  time: string;
  numberOfPeople: number;
  status: "pending" | "approved" | "rejected" | "cancelled";
  createdAt: string;
  updatedAt?: string;
  notes?: string;
  exhibition?: string;
  adminNotes?: string;
  cancellationReason?: string;
  cancelledAt?: string;
}

interface ReservationStore {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  updateReservation: (id: string, data: Partial<Reservation>) => void;
  updateReservationStatus: (id: string, status: Reservation['status'], adminNotes?: string) => void;
  cancelReservation: (id: string, cancellationReason: string) => void;
  deleteReservation: (id: string) => void;
  getReservationById: (id: string) => Reservation | undefined;
  getReservationsByStatus: (status: Reservation['status']) => Reservation[];
  getReservationsByDate: (date: string) => Reservation[];
  getUserReservations: (userId: string) => Reservation[];
  canCancelReservation: (reservation: Reservation) => boolean;
}

// Création du store Zustand pour les réservations
export const useReservationStore = create<ReservationStore>((set, get) => ({
  reservations: [],
  
  // Ajouter une nouvelle réservation
  addReservation: (reservationData) => {
    const newReservation: Reservation = {
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
      ...reservationData
    };
    
    set((state) => ({
      reservations: [...state.reservations, newReservation]
    }));
    
    // Notifier l'administrateur de la nouvelle réservation
    const { addNotification } = useNotificationStore.getState();
    addNotification({
      id: `reservation-${newReservation.id}`,
      title: "Nouvelle réservation",
      message: `${newReservation.visitorName} a réservé pour ${newReservation.numberOfPeople} personne(s) le ${formatDate(newReservation.date)} à ${newReservation.time}`,
      type: "info",
      read: false,
      date: new Date().toISOString(),
      category: "reservations"
    });
    
    return newReservation;
  },
  
  // Mettre à jour une réservation existante
  updateReservation: (id, data) => {
    set((state) => ({
      reservations: state.reservations.map((reservation) => 
        reservation.id === id 
          ? { ...reservation, ...data } 
          : reservation
      )
    }));
    
    // Si le statut a changé, envoyer une notification
    const updatedReservation = get().getReservationById(id);
    if (updatedReservation && data.status && data.status !== updatedReservation.status) {
      const { addNotification } = useNotificationStore.getState();
      addNotification({
        id: `reservation-status-${id}`,
        title: "Statut de réservation modifié",
        message: `La réservation de ${updatedReservation.visitorName} est maintenant ${data.status === "confirmed" ? "confirmée" : data.status === "cancelled" ? "annulée" : "en attente"}.`,
        type: "success",
        read: false,
        date: new Date().toISOString(),
        category: "reservations"
      });
    }
  },
  
  // Supprimer une réservation
  deleteReservation: (id) => {
    const reservationToDelete = get().getReservationById(id);
    
    set((state) => ({
      reservations: state.reservations.filter((reservation) => reservation.id !== id)
    }));
    
    // Notifier l'administrateur de la suppression
    if (reservationToDelete) {
      const { addNotification } = useNotificationStore.getState();
      addNotification({
        id: `reservation-deleted-${id}`,
        title: "Réservation supprimée",
        message: `La réservation de ${reservationToDelete.visitorName} pour le ${formatDate(reservationToDelete.date)} a été supprimée.`,
        type: "info",
        read: false,
        date: new Date().toISOString(),
        category: "reservations"
      });
    }
  },
  
  // Obtenir une réservation par son ID
  getReservationById: (id) => {
    return get().reservations.find((reservation) => reservation.id === id);
  },
  
  // Obtenir les réservations par statut
  getReservationsByStatus: (status) => {
    return get().reservations.filter((reservation) => reservation.status === status);
  },
  
  // Obtenir les réservations par date
  getReservationsByDate: (date) => {
    return get().reservations.filter((reservation) => reservation.date === date);
  },
  
  // Mettre à jour le statut d'une réservation (admin)
  updateReservationStatus: (id, status, adminNotes) => {
    set((state) => ({
      reservations: state.reservations.map((reservation) => 
        reservation.id === id 
          ? { 
              ...reservation, 
              status, 
              adminNotes,
              updatedAt: new Date().toISOString()
            } 
          : reservation
      )
    }));
    
    const { addNotification } = useNotificationStore.getState();
    const reservation = get().getReservationById(id);
    if (reservation) {
      let statusText = '';
      let notificationType: 'success' | 'info' | 'error' = 'info';
      
      switch (status) {
        case 'approved':
          statusText = 'acceptée';
          notificationType = 'success';
          break;
        case 'rejected':
          statusText = 'rejetée';
          notificationType = 'error';
          break;
        case 'cancelled':
          statusText = 'annulée';
          break;
        default:
          statusText = 'mise à jour';
      }
      
      addNotification({
        id: `reservation-status-${id}`,
        title: `Réservation ${statusText}`,
        message: `Votre réservation du ${formatDate(reservation.date)} à ${reservation.time} a été ${statusText}.`,
        type: notificationType,
        read: false,
        date: new Date().toISOString(),
        category: "reservations"
      });
    }
  },
  
  // Annuler une réservation (utilisateur)
  cancelReservation: (id, cancellationReason) => {
    const reservation = get().getReservationById(id);
    if (!reservation) return;
    
    if (!get().canCancelReservation(reservation)) {
      throw new Error('Cette réservation ne peut plus être annulée');
    }
    
    set((state) => ({
      reservations: state.reservations.map((res) => 
        res.id === id 
          ? { 
              ...res, 
              status: 'cancelled' as const,
              cancellationReason,
              cancelledAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            } 
          : res
      )
    }));
    
    const { addNotification } = useNotificationStore.getState();
    addNotification({
      id: `reservation-cancelled-${id}`,
      title: "Réservation annulée",
      message: `La réservation de ${reservation.visitorName} pour le ${formatDate(reservation.date)} a été annulée.`,
      type: "info",
      read: false,
      date: new Date().toISOString(),
      category: "reservations"
    });
  },
  
  // Obtenir les réservations d'un utilisateur
  getUserReservations: (userId) => {
    return get().reservations
      .filter((reservation) => reservation.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  // Vérifier si une réservation peut être annulée
  canCancelReservation: (reservation) => {
    if (reservation.status === 'cancelled') {
      return false;
    }
    
    // Ne peut pas annuler si la date est passée
    const reservationDateTime = new Date(`${reservation.date}T${reservation.time}`);
    const now = new Date();
    
    return reservationDateTime > now;
  }
}));

// Fonction utilitaire pour formater la date
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

// Fonction pour créer une réservation depuis le formulaire public
export const createReservation = (formData: {
  visitorName: string;
  visitorEmail: string;
  date: string;
  time: string;
  numberOfPeople: number;
  notes?: string;
  exhibition?: string;
}) => {
  const { addReservation } = useReservationStore.getState();
  return addReservation(formData);
};