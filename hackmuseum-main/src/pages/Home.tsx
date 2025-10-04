import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Scan, Languages, Headphones, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Scan,
      title: { fr: "Scan QR Code", en: "QR Code Scan", wo: "Scan QR Code" },
      description: {
        fr: "Scannez les codes QR pour accéder aux informations détaillées de chaque œuvre",
        en: "Scan QR codes to access detailed information about each artwork",
        wo: "Scan QR code ngir am xëbaar bu mat ci liggéey bu nekk",
      },
    },
    {
      icon: Languages,
      title: { fr: "Multilingue", en: "Multilingual", wo: "Bare làkk" },
      description: {
        fr: "Contenus disponibles en Français, Anglais et Wolof",
        en: "Content available in French, English and Wolof",
        wo: "Li nekk ci Français, Anglais ak Wolof",
      },
    },
    {
      icon: Headphones,
      title: { fr: "Audio Guide", en: "Audio Guide", wo: "Ñaan ci Mbind" },
      description: {
        fr: "Écoutez les descriptions audio pour une expérience immersive",
        en: "Listen to audio descriptions for an immersive experience",
        wo: "Dégg ay faramfacce audio ngir am xëy bu njëkk",
      },
    },
    {
      icon: Globe,
      title: { fr: "Accès Distant", en: "Remote Access", wo: "Am ci Kaw" },
      description: {
        fr: "Explorez le musée depuis n'importe où dans le monde",
        en: "Explore the museum from anywhere in the world",
        wo: "Xool musée bi ci ñaari bépp ci aduna",
      },
    },
  ];

  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("experience")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos fonctionnalités innovantes pour une visite enrichie
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title[language]}</h3>
                  <p className="text-muted-foreground">{feature.description[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
