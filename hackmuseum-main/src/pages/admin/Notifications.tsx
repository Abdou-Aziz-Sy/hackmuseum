import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Check, X, Clock, AlertCircle, Calendar, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: 'reservation' | 'system' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  metadata?: {
    reservationId?: string;
    userName?: string;
    userEmail?: string;
    visitDate?: string;
    groupSize?: number;
    visitType?: string;
  };
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reservation',
      title: 'Nouvelle réservation de groupe',
      message: 'Marie Diallo a demandé une visite guidée pour 25 personnes.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'pending',
      priority: 'high',
      metadata: {
        reservationId: 'RES-2024-001',
        userName: 'Marie Diallo',
        userEmail: 'marie.diallo@email.com',
        visitDate: '2024-12-20',
        groupSize: 25,
        visitType: 'Visite guidée'
      }
    },
    {
      id: '2',
      type: 'reservation',
      title: 'Réservation scolaire',
      message: 'Lycée Kennedy - 30 élèves pour une visite éducative.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: 'pending',
      priority: 'medium',
      metadata: {
        reservationId: 'RES-2024-002',
        userName: 'M. Ndiaye',
        userEmail: 'contact@lycee-kennedy.sn',
        visitDate: '2024-12-22',
        groupSize: 30,
        visitType: 'Visite scolaire'
      }
    },
    {
      id: '3',
      type: 'system',
      title: 'Maintenance prévue',
      message: 'Maintenance du système prévue le 15 décembre de 2h à 4h.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'resolved',
      priority: 'low'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Capacité maximale atteinte',
      message: 'Le créneau du 25 décembre est complet.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      status: 'resolved',
      priority: 'medium'
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleApproveReservation = (notification: Notification) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id 
          ? { ...n, status: 'approved' as const }
          : n
      )
    );
    toast.success(`Réservation ${notification.metadata?.reservationId} approuvée`);
    
    // Envoyer un email de confirmation (simulé)
    console.log(`Email envoyé à ${notification.metadata?.userEmail}`);
  };

  const handleRejectReservation = () => {
    if (!selectedNotification || !rejectReason.trim()) {
      toast.error("Veuillez indiquer une raison pour le rejet");
      return;
    }

    setNotifications(prev => 
      prev.map(n => 
        n.id === selectedNotification.id 
          ? { ...n, status: 'rejected' as const }
          : n
      )
    );
    
    toast.success(`Réservation ${selectedNotification.metadata?.reservationId} rejetée`);
    console.log(`Email de rejet envoyé à ${selectedNotification.metadata?.userEmail} avec la raison: ${rejectReason}`);
    
    setShowRejectDialog(false);
    setRejectReason('');
    setSelectedNotification(null);
  };

  const markAsResolved = (notification: Notification) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id 
          ? { ...n, status: 'resolved' as const }
          : n
      )
    );
    toast.success("Notification marquée comme résolue");
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return n.status === 'pending';
    if (activeTab === 'reservations') return n.type === 'reservation';
    if (activeTab === 'system') return n.type === 'system' || n.type === 'alert';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">En attente</Badge>;
      case 'approved': return <Badge variant="default">Approuvé</Badge>;
      case 'rejected': return <Badge variant="destructive">Rejeté</Badge>;
      case 'resolved': return <Badge variant="secondary">Résolu</Badge>;
      default: return null;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'reservation': return <Calendar className="h-5 w-5" />;
      case 'system': return <Info className="h-5 w-5" />;
      case 'alert': return <AlertCircle className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    return "À l'instant";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Centre de notifications</h1>
        <p className="text-muted-foreground">
          Gérez les réservations et les alertes système
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.type === 'reservation').length}
                </p>
                <p className="text-sm text-muted-foreground">Réservations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success/10">
                <Check className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.status === 'approved').length}
                </p>
                <p className="text-sm text-muted-foreground">Approuvées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notifications.filter(n => n.priority === 'high' && n.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Urgentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="reservations">Réservations</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Aucune notification</AlertTitle>
                <AlertDescription>
                  Il n'y a aucune notification dans cette catégorie.
                </AlertDescription>
              </Alert>
            ) : (
              filteredNotifications.map(notification => (
                <Card key={notification.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2 rounded-lg bg-${getPriorityColor(notification.priority)}/10`}>
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                            </div>
                            {getStatusBadge(notification.status)}
                          </div>
                          
                          {notification.metadata && (
                            <div className="bg-muted/50 rounded-lg p-3 mb-3">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Client:</span>
                                  <p className="font-medium">{notification.metadata.userName}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Date de visite:</span>
                                  <p className="font-medium">{notification.metadata.visitDate}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Groupe:</span>
                                  <p className="font-medium">{notification.metadata.groupSize} personnes</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Type:</span>
                                  <p className="font-medium">{notification.metadata.visitType}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Email:</span>
                                  <p className="font-medium text-xs">{notification.metadata.userEmail}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Référence:</span>
                                  <p className="font-medium">{notification.metadata.reservationId}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(notification.timestamp)}
                            </span>
                            
                            {notification.type === 'reservation' && notification.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedNotification(notification);
                                    setShowRejectDialog(true);
                                  }}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Rejeter
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveReservation(notification)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Approuver
                                </Button>
                              </div>
                            )}
                            
                            {notification.type !== 'reservation' && notification.status !== 'resolved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsResolved(notification)}
                              >
                                Marquer comme résolu
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter la réservation</DialogTitle>
            <DialogDescription>
              Veuillez indiquer la raison du rejet. Un email sera envoyé au client.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Raison du rejet</Label>
              <Textarea
                id="reason"
                placeholder="Ex: Le créneau demandé n'est plus disponible..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectReservation}
              disabled={!rejectReason.trim()}
            >
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notifications;
