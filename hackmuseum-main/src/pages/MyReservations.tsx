import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useReservationStore, Reservation } from "@/services/reservation-service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Users, FileText, X, AlertTriangle, CheckCircle, XCircle, Clock4 } from "lucide-react";
import Navigation from "@/components/Navigation";

const MyReservations = () => {
  const { user } = useAuth();
  const { reservations, cancelReservation, canCancelReservation } = useReservationStore();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtenir les réservations de l'utilisateur
  const userReservations = reservations.filter(
    reservation => reservation.userId === user?.id || reservation.visitorEmail === user?.email
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fonction pour obtenir le style du badge selon le statut
  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return { 
          text: 'En attente', 
          variant: 'default' as const, 
          icon: <Clock4 className="h-3 w-3" />,
          color: 'text-yellow-600'
        };
      case 'approved':
        return { 
          text: 'Acceptée', 
          variant: 'default' as const, 
          icon: <CheckCircle className="h-3 w-3" />,
          color: 'text-green-600'
        };
      case 'rejected':
        return { 
          text: 'Rejetée', 
          variant: 'destructive' as const, 
          icon: <XCircle className="h-3 w-3" />,
          color: 'text-red-600'
        };
      case 'cancelled':
        return { 
          text: 'Annulée', 
          variant: 'secondary' as const, 
          icon: <X className="h-3 w-3" />,
          color: 'text-gray-600'
        };
      default:
        return { 
          text: 'Inconnu', 
          variant: 'outline' as const, 
          icon: null,
          color: 'text-gray-400'
        };
    }
  };

  // Gérer l'ouverture du dialog d'annulation
  const handleCancelClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setCancelDialogOpen(true);
    setCancellationReason("");
  };

  // Gérer l'annulation de la réservation
  const handleCancelReservation = async () => {
    if (!selectedReservation || !cancellationReason.trim()) return;

    setIsSubmitting(true);
    try {
      cancelReservation(selectedReservation.id, cancellationReason.trim());
      setCancelDialogOpen(false);
      setSelectedReservation(null);
      setCancellationReason("");
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8 pt-24">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Vous devez être connecté pour voir vos réservations.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mes Réservations</h1>
          <p className="text-muted-foreground">
            Gérez vos réservations et suivez leur statut
          </p>
        </div>

        {userReservations.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Aucune réservation</h3>
              <p className="text-muted-foreground mb-4">
                Vous n'avez encore effectué aucune réservation.
              </p>
              <Button asChild>
                <a href="/reservation">Faire une réservation</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {userReservations.map((reservation) => {
              const statusBadge = getStatusBadge(reservation.status);
              const canCancel = canCancelReservation(reservation);

              return (
                <Card key={reservation.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          {formatDate(reservation.date)}
                        </CardTitle>
                        <CardDescription>
                          Réservation #{reservation.id.slice(-8)}
                        </CardDescription>
                      </div>
                      <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                        {statusBadge.icon}
                        {statusBadge.text}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Détails de la réservation */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span><strong>Heure :</strong> {reservation.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span><strong>Nombre de personnes :</strong> {reservation.numberOfPeople}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Créée le :</strong> {new Date(reservation.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                        {reservation.updatedAt && reservation.updatedAt !== reservation.createdAt && (
                          <div className="text-sm">
                            <strong>Mise à jour :</strong> {new Date(reservation.updatedAt).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Notes de l'utilisateur */}
                    {reservation.notes && (
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Vos notes
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                          {reservation.notes}
                        </p>
                      </div>
                    )}

                    {/* Notes de l'admin */}
                    {reservation.adminNotes && (
                      <div>
                        <h4 className="font-medium mb-2">Message de l'administration</h4>
                        <Alert>
                          <AlertDescription>{reservation.adminNotes}</AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {/* Raison d'annulation */}
                    {reservation.cancellationReason && (
                      <div>
                        <h4 className="font-medium mb-2">Raison de l'annulation</h4>
                        <Alert variant="destructive">
                          <AlertDescription>{reservation.cancellationReason}</AlertDescription>
                        </Alert>
                        {reservation.cancelledAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Annulée le {new Date(reservation.cancelledAt).toLocaleString('fr-FR')}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    {canCancel && (
                      <div className="pt-4 border-t">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelClick(reservation)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Annuler la réservation
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Dialog d'annulation */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Annuler la réservation</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir annuler votre réservation du{" "}
                {selectedReservation && formatDate(selectedReservation.date)} à{" "}
                {selectedReservation?.time} ?
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Raison de l'annulation <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="Veuillez expliquer pourquoi vous souhaitez annuler cette réservation..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Cette action est irréversible. Une fois annulée, vous devrez faire une nouvelle réservation.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCancelDialogOpen(false)}
                disabled={isSubmitting}
              >
                Garder la réservation
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelReservation}
                disabled={isSubmitting || !cancellationReason.trim()}
              >
                {isSubmitting ? "Annulation..." : "Confirmer l'annulation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyReservations;