import Navigation from "@/components/Navigation";
import ReservationForm from "@/components/ReservationForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Users, MapPin, Phone, Mail, Euro, Info, AlertCircle } from "lucide-react";

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
                    <span className="font-medium">Mardi - Samedi</span>
                    <span>10h00 - 19h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dimanche</span>
                    <span>Fermé</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Lundi</span>
                    <span>Fermé</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Tarifs Visite Libre
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tarif plein</span>
                    <span className="font-semibold">3000 FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Scolaire/Étudiant</span>
                    <span className="font-semibold">500 FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Groupe (10-30 pers.)</span>
                    <span className="font-semibold">2500 FCFA/pers.</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Tarifs Visite Guidée
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tarif plein</span>
                    <span className="font-semibold">5000 FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tarif scolaire</span>
                    <span className="font-semibold">1000 FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tarif étudiant</span>
                    <span className="font-semibold">1500 FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Groupe (10-30 pers.)</span>
                    <span className="font-semibold">4000 FCFA/pers.</span>
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
                    <span>Autoroute prolongée, Place de la Gare</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+221 33 889 11 80</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>info@museecivilisationsnoires.sn</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Consignes et règles de visite */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Consignes de visite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Visites de groupes :</strong> Les élèves doivent circuler au Musée en sous-groupes, accompagnés d'une personne responsable.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <h4 className="font-semibold">Règles à respecter :</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Il est interdit de boire ou de manger dans les salles d'exposition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Les contenants de liquide doivent être rangés dans votre sac
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Les photos avec flash ne sont pas permises
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Il est interdit de toucher aux objets dans les salles d'exposition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Circulez calmement. Il est interdit de courir dans le Musée
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Accessibilité universelle</h4>
                <p className="text-sm text-muted-foreground">
                  Le MCN est accessible à toutes les personnes.
                </p>
              </div>
            </CardContent>
          </Card>

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
                <h4 className="font-semibold mb-2">Quels sont les tarifs d'entrée ?</h4>
                <p className="text-sm text-muted-foreground">
                  Visite libre : 3000 FCFA (tarif plein), 500 FCFA (scolaire/étudiant). 
                  Visite guidée : 5000 FCFA (tarif plein), 1000-1500 FCFA (scolaire/étudiant).
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Comment réserver pour un groupe ?</h4>
                <p className="text-sm text-muted-foreground">
                  Les groupes de 10 à 30 personnes bénéficient de tarifs préférentiels. Contactez-nous directement pour organiser votre visite.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Les visites guidées sont-elles disponibles tous les jours ?</h4>
                <p className="text-sm text-muted-foreground">
                  Les visites guidées sont disponibles du mardi au samedi. Réservation recommandée pour garantir la disponibilité d'un guide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Le musée est-il accessible aux personnes à mobilité réduite ?</h4>
                <p className="text-sm text-muted-foreground">
                  Oui, le MCN est entièrement accessible à toutes les personnes, avec des aménagements spécifiques pour faciliter la visite.
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
