import Navigation from "@/components/Navigation";
import ReservationForm from "@/components/ReservationForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, MapPin, Phone, Mail } from "lucide-react";

const Reservation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Réserver une visite
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Planifiez votre visite au Musée des Civilisations Noires et découvrez notre collection exceptionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire de réservation */}
            <div className="lg:col-span-2">
              <ReservationForm />
            </div>

            {/* Informations pratiques */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Horaires d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Lundi - Vendredi</span>
                    <span>9h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Samedi</span>
                    <span>9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Créneaux de visite
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <div className="font-medium">Matin</div>
                    <div>9h00 - 10h30</div>
                    <div>10h30 - 12h00</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Après-midi</div>
                    <div>14h00 - 15h30</div>
                    <div>15h30 - 17h00</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Informations pratiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium mb-1">Durée de visite</div>
                    <div>1h30 par créneau</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-1">Groupe maximum</div>
                    <div>20 personnes</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-1">Tarif</div>
                    <div className="text-green-600 font-semibold">Gratuit</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-1">Annulation</div>
                    <div>Jusqu'à 24h avant</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Place de la Renaissance, Dakar</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+221 33 825 98 00</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>info@mcn.sn</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Questions fréquentes</CardTitle>
              <CardDescription>
                Tout ce que vous devez savoir sur les réservations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Dois-je payer pour visiter le musée ?</h4>
                <p className="text-sm text-muted-foreground">
                  Non, l'entrée au musée est gratuite. Les réservations sont également gratuites.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Puis-je annuler ma réservation ?</h4>
                <p className="text-sm text-muted-foreground">
                  Oui, vous pouvez annuler votre réservation jusqu'à 24h avant la date prévue.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Que se passe-t-il si j'arrive en retard ?</h4>
                <p className="text-sm text-muted-foreground">
                  Nous vous recommandons d'arriver 15 minutes avant votre créneau. En cas de retard important, nous essaierons de vous accommoder selon les disponibilités.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Puis-je visiter sans réservation ?</h4>
                <p className="text-sm text-muted-foreground">
                  Oui, mais nous recommandons fortement de réserver pour garantir votre place et éviter l'attente.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reservation;
