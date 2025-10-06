import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Users, Globe, Award, MapPin, Clock, Phone, Mail, ExternalLink, Star } from "lucide-react";

const About = () => {
  const { t, language } = useLanguage();

  const stats = [
    { icon: Building2, value: "2018", label: { fr: "Année d'ouverture", en: "Opening Year", wo: "Awu Ubbi" } },
    { icon: Users, value: "50-100K", label: { fr: "Visiteurs par an", en: "Annual Visitors", wo: "Ay Jëfandikoo ci Aw" } },
    { icon: Globe, value: "18 000", label: { fr: "Pièces en collection", en: "Collection Pieces", wo: "Ay pièces ci kolleksion" } },
    { icon: Award, value: "1966", label: { fr: "Conception initiale", en: "Initial Conception", wo: "Njëkk xalaat" } },
  ];

  const contactInfo = {
    address: {
      fr: "Route de l'Aéroport Léopold Sédar Senghor, Dakar, Sénégal",
      en: "Léopold Sédar Senghor Airport Road, Dakar, Senegal",
      wo: "Yoonu Aéroport Léopold Sédar Senghor, Dakar, Senegaal"
    },
    hours: {
      fr: "Mardi - Samedi: 10h00 - 19h00\nDimanche et Lundi: Fermé",
      en: "Tuesday - Saturday: 10:00 AM - 7:00 PM\nClosed Sunday and Monday",
      wo: "Talaata - Gaawu: 10h00 - 19h00\nDibéer ak Altene: Ubbul"
    },
    phone: "+221 33 889 11 80",
    email: "info@museecivilisationsnoires.sn"
  };

  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com/museecivilisationsnoires", icon: "📘" },
    { name: "Twitter", url: "https://twitter.com/museecivilisationsnoires", icon: "🐦" },
    { name: "Instagram", url: "https://instagram.com/museecivilisationsnoires", icon: "📷" },
    { name: "YouTube", url: "https://youtube.com/museecivilisationsnoires", icon: "📺" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos du Musée des Civilisations noires
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {language === "fr" && "Projet au long cours, pensé tour à tour par Lamine Senghor, Léopold Sedar Senghor et Abdoulaye Wade, le Musée des Civilisations noires a été inauguré le 6 décembre 2018 par le Président Macky Sall. Le MCN œuvre pour la valorisation de l'apport des Civilisations noires au patrimoine universel de l'humanité."}
              {language === "en" && "A long-term project, conceived by Lamine Senghor, Léopold Sedar Senghor and Abdoulaye Wade, the Museum of Black Civilizations was inaugurated on December 6, 2018 by President Macky Sall. The MCN works to promote the contribution of Black Civilizations to the universal heritage of humanity."}
              {language === "wo" && "Projet bu ndaw bu Lamine Senghor, Léopold Sedar Senghor ak Abdoulaye Wade xalaatal, Musée des Civilisations noires bi, Président Macky Sall moo ko ubbi ci 6 décembre 2018. MCN bi dafa liggéey ngir wone li Civilisations noires yi jëfandikoo ci patrimoine bu aduna bi."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center animate-scale-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label[language]}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div className="space-y-8 animate-fade-in-up">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    {language === "fr" ? "Notre Mission" : language === "en" ? "Our Mission" : "Suñu Mbind"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {language === "fr" && "Le visiteur qui franchit la porte de la case à impluvium qui a inspiré son architecture rencontre l'Afrique, berceau de l'humanité. À travers les fascinantes œuvres exposées, il découvre la dispersion des peuples noirs à travers le monde, leurs formations sociales, modes de production, représentations symboliques et rites initiatiques depuis la nuit des temps."}
                    {language === "en" && "The visitor who crosses the threshold of the impluvium house that inspired its architecture encounters Africa, cradle of humanity. Through the fascinating works on display, they discover the dispersion of black peoples throughout the world, their social formations, modes of production, symbolic representations and initiation rites since the dawn of time."}
                    {language === "wo" && "Ki dugg ci këru impluvium bi mel ci architecture bi, moo gis Afrik, berceau bu humanité. Ci liggéey yi fascinant yu ñu wone, moo gis dispersion bu askan yu ñuul ci aduna bi, seen formation social, anam yu production, representation symbolique ak rite initiation yu njëkk."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    {language === "fr" ? "Innovation Digitale" : language === "en" ? "Digital Innovation" : "Yoon bu Digital"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {language === "fr" && "Dans le cadre du Dakar Slush'D, nous avons lancé cette plateforme digitale pour permettre à un public mondial de découvrir nos collections. Grâce à la technologie QR Code, aux descriptions audio multilingues et à une expérience interactive, nous démocratisons l'accès à la culture africaine."}
                    {language === "en" && "As part of Dakar Slush'D, we launched this digital platform to enable a global audience to discover our collections. Thanks to QR Code technology, multilingual audio descriptions and an interactive experience, we are democratizing access to African culture."}
                    {language === "wo" && "Ci jamano Dakar Slush'D, ñu ubbi platform bii bu digital ngir defal aduna bi man a gis suñu kolleksion. Ci ëmb QR Code, faramfacce audio yu bare làkk ak xëy bu jëfandikoo, ñu man a gis aada bu Afrik."}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8 animate-fade-in-up">
              <Card className="gradient-hero text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {language === "fr" ? "Informations Pratiques" : language === "en" ? "Practical Information" : "Xëbaar yu Jëf"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Adresse</p>
                      <p className="text-sm opacity-90">{contactInfo.address[language]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">
                        {language === "fr" ? "Horaires" : language === "en" ? "Hours" : "Waxtu"}
                      </p>
                      <p className="text-sm opacity-90 whitespace-pre-line">{contactInfo.hours[language]}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Téléphone</p>
                      <p className="text-sm opacity-90">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-sm opacity-90">{contactInfo.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          <Card className="animate-fade-in mb-8">
            <CardHeader>
              <CardTitle className="text-center">
                {language === "fr" ? "Partenaires & Soutiens" : language === "en" ? "Partners & Supporters" : "Jëfandikoo & Ndimbal"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src="/logo-unesco.png" 
                    alt="UNESCO" 
                    className="h-20 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-2xl font-bold text-primary">UNESCO</div>
                  <p className="text-sm text-muted-foreground text-center">Patrimoine Mondial</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src="/logo-ue.jpg" 
                    alt="Union Européenne" 
                    className="h-20 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-2xl font-bold text-primary">UE</div>
                  <p className="text-sm text-muted-foreground text-center">Coopération Culturelle</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src="/logo-slushd.jpg" 
                    alt="Slush'D" 
                    className="h-20 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-2xl font-bold text-primary">Slush'D</div>
                  <p className="text-sm text-muted-foreground text-center">Innovation Tech</p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <img 
                    src="/logo-gouvernement.jpg" 
                    alt="Gouvernement du Sénégal" 
                    className="h-20 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-2xl font-bold text-primary">Gouvernement</div>
                  <p className="text-sm text-muted-foreground text-center">République du Sénégal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section Suivez-nous */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">
                {language === "fr" ? "Suivez-nous" : language === "en" ? "Follow Us" : "Toppal nu"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <span className="text-xl">{social.icon}</span>
                    {social.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
