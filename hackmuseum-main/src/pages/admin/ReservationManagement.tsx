import { useState, useEffect } from "react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
  import { Calendar, Search, Filter, MoreHorizontal, Trash2, Edit, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { useLanguage } from "@/contexts/LanguageContext";
  import { useNotificationStore } from "@/services/notification-service";
  import AdminNavigation from "@/components/AdminNavigation";
  import { useReservationStore } from "@/services/reservation-service";

// Types pour les réservations
interface Reservation {
  id: string;
  visitorName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  numberOfVisitors: number;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
  createdAt: string;
}

// Données de démonstration
const mockReservations: Reservation[] = [
  {
    id: "res-001",
    visitorName: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    date: "2023-11-15",
    timeSlot: "10:30",
    numberOfVisitors: 2,
    status: "confirmed",
    notes: "Besoin d'un accès handicapé",
    createdAt: "2023-11-01T14:30:00Z"
  },
  {
    id: "res-002",
    visitorName: "Marie Martin",
    email: "marie.martin@example.com",
    phone: "07 23 45 67 89",
    date: "2023-11-16",
    timeSlot: "14:00",
    numberOfVisitors: 4,
    status: "pending",
    createdAt: "2023-11-02T09:15:00Z"
  },
  {
    id: "res-003",
    visitorName: "Pierre Durand",
    email: "pierre.durand@example.com",
    phone: "06 34 56 78 90",
    date: "2023-11-17",
    timeSlot: "15:30",
    numberOfVisitors: 1,
    status: "cancelled",
    notes: "Annulation pour cause de maladie",
    createdAt: "2023-11-03T16:45:00Z"
  },
  {
    id: "res-004",
    visitorName: "Sophie Petit",
    email: "sophie.petit@example.com",
    phone: "07 45 67 89 01",
    date: "2023-11-18",
    timeSlot: "09:00",
    numberOfVisitors: 3,
    status: "confirmed",
    createdAt: "2023-11-04T11:20:00Z"
  },
  {
    id: "res-005",
    visitorName: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    phone: "06 56 78 90 12",
    date: "2023-11-19",
    timeSlot: "14:00",
    numberOfVisitors: 2,
    status: "pending",
    createdAt: "2023-11-05T13:10:00Z"
  }
];

// Formater la date pour l'affichage
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }).format(date);
};

// Formater l'heure pour l'affichage
const formatTimeSlot = (timeSlot: string) => {
  const timeSlots: Record<string, string> = {
    "10:00": "10h00 - 11h30",
    "11:30": "11h30 - 13h00",
    "14:00": "14h00 - 15h30",
    "15:30": "15h30 - 17h00",
    // Compatibilité anciens créneaux
    "09:00": "9h00 - 10h30",
    "10:30": "10h30 - 12h00"
  };
  
  return timeSlots[timeSlot] || timeSlot;
};

// Obtenir la couleur du badge en fonction du statut
const getStatusColor = (status: Reservation["status"]) => {
  switch (status) {
    case "confirmed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

// Obtenir le libellé du statut
const getStatusLabel = (status: Reservation["status"]) => {
  switch (status) {
    case "confirmed":
      return "Confirmée";
    case "pending":
      return "En attente";
    case "cancelled":
      return "Annulée";
    default:
      return status;
  }
};

const ReservationManagement = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotificationStore();
  const { reservations: storeReservations } = useReservationStore();

  const mapStoreToAdmin = (items: any[]): Reservation[] =>
    items.map((r: any) => ({
      id: r.id,
      visitorName: r.visitorName,
      email: r.visitorEmail,
      phone: "",
      date: r.date,
      timeSlot: r.time,
      numberOfVisitors: r.numberOfPeople,
      status: r.status === 'approved' 
        ? 'confirmed' 
        : (r.status === 'cancelled' || r.status === 'rejected') 
          ? 'cancelled' 
          : 'pending',
      notes: r.notes,
      createdAt: r.createdAt,
    }));

  const [reservations, setReservations] = useState<Reservation[]>(
    (storeReservations && storeReservations.length)
      ? mapStoreToAdmin(storeReservations)
      : mockReservations
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Reservation["status"] | "all">("all");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setReservations((storeReservations && storeReservations.length)
      ? mapStoreToAdmin(storeReservations)
      : mockReservations);
  }, [storeReservations]);

  // Filtrer les réservations
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = 
      reservation.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Changer le statut d'une réservation
  const changeStatus = (id: string, newStatus: Reservation["status"]) => {
    const updatedReservations = reservations.map(reservation => 
      reservation.id === id 
        ? { ...reservation, status: newStatus } 
        : reservation
    );
    
    setReservations(updatedReservations);
    
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      addNotification({
        title: `Statut de réservation modifié`,
        message: `La réservation de ${reservation.visitorName} est maintenant ${getStatusLabel(newStatus).toLowerCase()}.`,
        type: newStatus === "confirmed" ? "success" : newStatus === "cancelled" ? "error" : "info",
        priority: "medium",
        category: "reservation",
        dismissible: true,
        autoClose: false
      });
    }
    
    setIsDetailsOpen(false);
  };

  // Supprimer une réservation
  const deleteReservation = (id: string) => {
    const reservation = reservations.find(r => r.id === id);
    const updatedReservations = reservations.filter(reservation => reservation.id !== id);
    setReservations(updatedReservations);
    
    if (reservation) {
      addNotification({
        title: "Réservation supprimée",
        message: `La réservation de ${reservation.visitorName} a été supprimée.`,
        type: "warning",
        priority: "medium",
        category: "reservation",
        dismissible: true,
        autoClose: false
      });
    }
    
    setIsDeleteOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Gestion des Réservations</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Rechercher par nom, email ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="confirmed">Confirmées</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Réservations ({filteredReservations.length})</CardTitle>
            <CardDescription>
              Gérez les réservations des visiteurs du musée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visiteur</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Horaire</TableHead>
                    <TableHead>Personnes</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{reservation.visitorName}</div>
                            <div className="text-sm text-muted-foreground">{reservation.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(reservation.date)}</TableCell>
                        <TableCell>{formatTimeSlot(reservation.timeSlot)}</TableCell>
                        <TableCell>{reservation.numberOfVisitors}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(reservation.status)}>
                            {getStatusLabel(reservation.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setIsEditOpen(true);
                              }}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedReservation(reservation);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        Aucune réservation trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Modal de détails */}
      {selectedReservation && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails de la réservation</DialogTitle>
              <DialogDescription>
                Réservation #{selectedReservation.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Visiteur</h4>
                  <p className="text-base">{selectedReservation.visitorName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p className="text-base">{selectedReservation.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Téléphone</h4>
                  <p className="text-base">{selectedReservation.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Nombre de visiteurs</h4>
                  <p className="text-base">{selectedReservation.numberOfVisitors}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <p className="text-base">{formatDate(selectedReservation.date)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Horaire</h4>
                  <p className="text-base">{formatTimeSlot(selectedReservation.timeSlot)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
                  <Badge className={getStatusColor(selectedReservation.status)}>
                    {getStatusLabel(selectedReservation.status)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date de création</h4>
                  <p className="text-base">{formatDate(selectedReservation.createdAt)}</p>
                </div>
              </div>
              
              {selectedReservation.notes && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                  <p className="text-base">{selectedReservation.notes}</p>
                </div>
              )}
              
              <div className="flex flex-col gap-2 mt-4">
                <h4 className="text-sm font-medium text-muted-foreground">Changer le statut</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => changeStatus(selectedReservation.id, "confirmed")}
                    disabled={selectedReservation.status === "confirmed"}
                  >
                    <CheckCircle size={16} />
                    Confirmer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => changeStatus(selectedReservation.id, "pending")}
                    disabled={selectedReservation.status === "pending"}
                  >
                    <Clock size={16} />
                    En attente
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => changeStatus(selectedReservation.id, "cancelled")}
                    disabled={selectedReservation.status === "cancelled"}
                  >
                    <XCircle size={16} />
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDetailsOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Modal de suppression */}
      {selectedReservation && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Supprimer la réservation</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p>
                Réservation de <strong>{selectedReservation.visitorName}</strong> pour le{" "}
                <strong>{formatDate(selectedReservation.date)}</strong> à{" "}
                <strong>{formatTimeSlot(selectedReservation.timeSlot)}</strong>.
              </p>
            </div>
            
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
                Annuler
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => deleteReservation(selectedReservation.id)}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReservationManagement;
