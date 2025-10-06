import { MapPin, Clock, Users, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PracticalInfo = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 py-8">
      {/* Horaires */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Horaires d'ouverture</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Mardi - Samedi : 10h00 - 19h00
              </p>
              <p className="text-sm text-muted-foreground">
                Dimanche : Fermé
              </p>
              <p className="text-sm text-muted-foreground">
                Lundi : Fermé
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Localisation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Localisation</h3>
              <p className="text-sm text-muted-foreground mb-1">
                Autoroute prolongée
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Place de la Gare, Dakar
              </p>
              <a
                href="https://maps.app.goo.gl/YourMapLink"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Voir sur la carte →
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Réservation de groupe */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Visite guidée</h3>
              <p className="text-sm text-muted-foreground mb-3">
                À partir de 10 personnes
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Maximum 30 personnes par groupe
              </p>
              <Button asChild size="sm" className="w-full">
                <Link to="/reservation">Réservez</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticalInfo;
