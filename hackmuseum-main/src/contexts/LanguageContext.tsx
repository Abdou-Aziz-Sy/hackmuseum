import React, { createContext, useContext, useState } from "react";

export type Language = "fr" | "en" | "wo";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    home: "Accueil",
    gallery: "Galerie",
    about: "À propos",
    experience: "Expérience Digitale",
    welcomeTitle: "Musée des Civilisations Noires",
    welcomeSubtitle: "Découvrez le patrimoine culturel africain à travers une expérience digitale immersive",
    exploreGallery: "Explorer la Galerie",
    scanQR: "Scanner le QR Code",
    ourCollection: "Notre Collection",
    collectionDesc: "Explorez les œuvres emblématiques du musée",
    listenAudio: "Écouter la description",
    viewDetails: "Voir les détails",
    artworkHistory: "Histoire de l'œuvre",
    culturalContext: "Contexte culturel",
    technicalDetails: "Détails techniques",
    backToGallery: "Retour à la galerie",
    languageSelect: "Sélectionner la langue",
    description: "Description",
    artist: "Artiste",
    period: "Période",
    origin: "Origine",
    category: "Catégorie",
    allCategories: "Toutes les catégories",
    filterByCategory: "Filtrer par catégorie",
    searchArtworks: "Rechercher des œuvres...",
    sortByTitle: "Trier par titre",
    sortByArtist: "Trier par artiste",
    sortByPeriod: "Trier par période",
    sortByOrigin: "Trier par origine",
    noArtworksFound: "Aucune œuvre trouvée",
    tryDifferentSearch: "Essayez avec d'autres termes de recherche",
    artwork: "œuvre",
    artworks: "œuvres",
    inCategory: "dans la catégorie",
  },
  en: {
    home: "Home",
    gallery: "Gallery",
    about: "About",
    experience: "Digital Experience",
    welcomeTitle: "Museum of Black Civilizations",
    welcomeSubtitle: "Discover African cultural heritage through an immersive digital experience",
    exploreGallery: "Explore Gallery",
    scanQR: "Scan QR Code",
    ourCollection: "Our Collection",
    collectionDesc: "Explore the museum's iconic artworks",
    listenAudio: "Listen to description",
    viewDetails: "View details",
    artworkHistory: "Artwork History",
    culturalContext: "Cultural Context",
    technicalDetails: "Technical Details",
    backToGallery: "Back to gallery",
    languageSelect: "Select language",
    description: "Description",
    artist: "Artist",
    period: "Period",
    origin: "Origin",
    category: "Category",
    allCategories: "All Categories",
    filterByCategory: "Filter by Category",
    searchArtworks: "Search artworks...",
    sortByTitle: "Sort by title",
    sortByArtist: "Sort by artist",
    sortByPeriod: "Sort by period",
    sortByOrigin: "Sort by origin",
    noArtworksFound: "No artworks found",
    tryDifferentSearch: "Try with different search terms",
    artwork: "artwork",
    artworks: "artworks",
    inCategory: "in category",
  },
  wo: {
    home: "Kër",
    gallery: "Galeri",
    about: "Ci Yoon",
    experience: "Xëy bu Njëkk",
    welcomeTitle: "Musée bu Sivilizasioon yu Ñuul",
    welcomeSubtitle: "Gis aaduna jëmm bu Afrik ci xëy bu njëkk",
    exploreGallery: "Xool Galeri",
    scanQR: "Scan QR Code",
    ourCollection: "Suñu Kolleksion",
    collectionDesc: "Xool ay liggéey yu bees ci musée bi",
    listenAudio: "Dégg li wax",
    viewDetails: "Xool li bees",
    artworkHistory: "Tarix bu liggéey",
    culturalContext: "Jikko bu aada",
    technicalDetails: "Ay détail teknik",
    backToGallery: "Dellu galeri",
    languageSelect: "Tànn làkk",
    description: "Faramfacce",
    artist: "Artiste",
    period: "Waxtu",
    origin: "Jiitu",
    category: "Yoon",
    allCategories: "Yoon yépp",
    filterByCategory: "Sàngal ci Yoon",
    searchArtworks: "Sàngal ay liggéey...",
    sortByTitle: "Sàngal ci tur",
    sortByArtist: "Sàngal ci artiste",
    sortByPeriod: "Sàngal ci waxtu",
    sortByOrigin: "Sàngal ci jiitu",
    noArtworksFound: "Liggéey amul",
    tryDifferentSearch: "Jëfandikoo ay tur yu wuute",
    artwork: "liggéey",
    artworks: "liggéey",
    inCategory: "ci yoon",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
