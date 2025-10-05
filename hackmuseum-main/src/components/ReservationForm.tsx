import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { useNotificationStore } from "@/services/notification-service";

const ReservationForm = () => {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    visitDate: "",
    timeSlot: "",
    numberOfVisitors: 1,
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    { value: "09:00", label: "9h00 - 10h30" },
    { value: "10:30", label: "10h30 - 12h00" },
    { value: "14:00", label: "14h00 - 15h30" },
    { value: "15:30", label: "15h30 - 17h00" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setError("Vous devez être connecté pour effectuer une réservation");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Récupérer la fonction addNotification du store
    const { addNotification } = useNotificationStore.getState();

    try {
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Envoyer une notification à l'administrateur
      addNotification({
        title: "Nouvelle réservation",
        message: `${user?.name || 'Un utilisateur'} a réservé pour ${formData.numberOfVisitors} personne(s) le ${formatDate(formData.visitDate)} à ${getTimeLabel(formData.timeSlot)}`,
        type: "info",
        priority: "high",
        category: "reservation",
        dismissible: true,
        autoClose: false
      });
      
      setSuccess(true);
    } catch (err) {
      setError("Une erreur est survenue lors de la réservation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
            <p className="text-muted-foreground mb-4">
              Votre réservation a été enregistrée. Vous recevrez un email de confirmation.
            </p>
            <Button onClick={() => setSuccess(false)} variant="outline">
              Nouvelle réservation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Réserver une visite
        </CardTitle>
        <CardDescription>
          Planifiez votre visite au musée des Civilisations Noires
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isAuthenticated && (
            <Alert>
              <AlertDescription>
                Vous devez être connecté pour effectuer une réservation.{" "}
                <Button variant="link" className="p-0 h-auto">
                  Se connecter
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="visitDate">Date de visite</Label>
            <Input
              id="visitDate"
              type="date"
              value={formData.visitDate}
              onChange={(e) => handleChange("visitDate", e.target.value)}
              min={getMinDate()}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeSlot">Créneau horaire</Label>
            <Select value={formData.timeSlot} onValueChange={(value) => handleChange("timeSlot", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un créneau" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {slot.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfVisitors">Nombre de visiteurs</Label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleChange("numberOfVisitors", Math.max(1, formData.numberOfVisitors - 1))}
                disabled={formData.numberOfVisitors <= 1}
              >
                -
              </Button>
              <div className="flex items-center space-x-2 flex-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{formData.numberOfVisitors}</span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleChange("numberOfVisitors", Math.min(20, formData.numberOfVisitors + 1))}
                disabled={formData.numberOfVisitors >= 20}
              >
                +
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum 20 personnes par groupe
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Informations supplémentaires pour votre visite..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !isAuthenticated}
          >
            {isLoading ? "Réservation en cours..." : "Confirmer la réservation"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Informations importantes :</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Les réservations sont gratuites</li>
            <li>• Durée de visite : 1h30</li>
            <li>• Présentez-vous 15 minutes avant</li>
            <li>• Annulation possible jusqu'à 24h avant</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
