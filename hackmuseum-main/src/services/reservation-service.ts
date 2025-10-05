import { create } from 'zustand';
import { useNotificationStore } from './notification-service';

// Types pour les réservations
export interface Reservation {
  id: string;
  visitorName: string;
  visitorEmail: string;
  date: string;
  time: string;
  numberOfPeople: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
  notes?: string;
  exhibition?: string;
}

interface ReservationStore {
  reservations: Reservation[];
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  updateReservation: (id: string, data: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  getReservationById: (id: string) => Reservation | undefined;
  getReservationsByStatus: (status: Reservation['status']) => Reservation[];
  getReservationsByDate: (date: string) => Reservation[];
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