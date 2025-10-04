import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Users, Globe, Award, MapPin, Clock, Phone, Mail, ExternalLink, Star } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Building2, value: "2018", label: { fr: "Année d'ouverture", en: "Opening Year", wo: "Awu Ubbi" } },
    { icon: Users, value: "100K+", label: { fr: "Visiteurs annuels", en: "Annual Visitors", wo: "Ay Jëfandikoo ci Aw" } },
    { icon: Globe, value: "54", label: { fr: "Pays représentés", en: "Countries Represented", wo: "Réew yu Wone" } },
    { icon: Award, value: "5000+", label: { fr: "Œuvres exposées", en: "Exhibited Works", wo: "Liggéey yu Wone" } },
  ];

  const contactInfo = {
    address: {
      fr: "Route de l'Aéroport Léopold Sédar Senghor, Dakar, Sénégal",
      en: "Léopold Sédar Senghor Airport Road, Dakar, Senegal",
      wo: "Yoonu Aéroport Léopold Sédar Senghor, Dakar, Senegaal"
    },
    hours: {
      fr: "Mardi - Dimanche: 9h00 - 18h00\nFermé le lundi",
      en: "Tuesday - Sunday: 9:00 AM - 6:00 PM\nClosed on Monday",
      wo: "Talaata - Dibéer: 9h00 - 18h00\nUbbul ci Altene"
    },
    phone: "+221 33 869 47 47",
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
              {t("about")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {language === "fr" && "Le Musée des Civilisations Noires est l'un des plus grands espaces culturels d'Afrique, dédié à la préservation et à la célébration du patrimoine des civilisations noires."}
              {language === "en" && "The Museum of Black Civilizations is one of Africa's largest cultural spaces, dedicated to preserving and celebrating the heritage of black civilizations."}
              {language === "wo" && "Musée bu Sivilizasioon yu Ñuul mooy benn ci barab yu mag yu aada yu Afrik, ñu ko def ngir wone ak wone naat bu aada bu sivilizasioon yu ñuul."}
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
                    {language === "fr" && "Nous nous engageons à offrir une expérience culturelle enrichissante qui célèbre la diversité et la richesse des civilisations noires à travers le monde. Notre musée sert de pont entre le passé, le présent et l'avenir, tout en rendant accessible ce patrimoine inestimable grâce au digital."}
                    {language === "en" && "We are committed to offering an enriching cultural experience that celebrates the diversity and richness of black civilizations around the world. Our museum serves as a bridge between the past, present and future, while making this invaluable heritage accessible through digital means."}
                    {language === "wo" && "Dafu nuy binde ngir jox ay xëy bu aada bu njëkk bu wone melo ak naat bu sivilizasioon yu ñuul ci aduna bi. Musée bi nuy jëfandikoo ngir jëfëndikoo jamano ju ñëw ak jamano ju nekk ak jamano ju ñëw, waaye ñu man koy gis ngir digital."}
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

              <Card>
                <CardHeader>
                  <CardTitle>
                    {language === "fr" ? "Suivez-nous" : language === "en" ? "Follow Us" : "Toppal nu"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => (
                      <Button
                        key={social.name}
                        variant="outline"
                        size="sm"
                        className="justify-start gap-2"
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        <span className="text-lg">{social.icon}</span>
                        {social.name}
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center">
                {language === "fr" ? "Partenaires & Soutiens" : language === "en" ? "Partners & Supporters" : "Jëfandikoo & Ndimbal"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">UNESCO</div>
                  <p className="text-sm text-muted-foreground">Patrimoine Mondial</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">UE</div>
                  <p className="text-sm text-muted-foreground">Coopération Culturelle</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">Slush'D</div>
                  <p className="text-sm text-muted-foreground">Innovation Tech</p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">Gouvernement</div>
                  <p className="text-sm text-muted-foreground">République du Sénégal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
