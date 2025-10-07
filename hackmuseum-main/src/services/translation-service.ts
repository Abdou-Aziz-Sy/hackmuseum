import { Language } from "@/contexts/LanguageContext";

// Service de traduction automatique avancé
class TranslationService {
  private apiKey: string = "demo-key";
  
  // Dictionnaire spécialisé pour les termes culturels et artistiques
  private culturalDictionary: Record<string, Record<Language, string>> = {
    // Termes artistiques généraux
    "sculpture": { fr: "sculpture", en: "sculpture", wo: "sëriñ" },
    "masque": { fr: "masque", en: "mask", wo: "mask" },
    "textile": { fr: "textile", en: "textile", wo: "tiil" },
    "poterie": { fr: "poterie", en: "pottery", wo: "bëñ" },
    "bijoux": { fr: "bijoux", en: "jewelry", wo: "yërmënde" },
    "instrument": { fr: "instrument", en: "instrument", wo: "xalam" },
    
    // Matériaux
    "bois": { fr: "bois", en: "wood", wo: "xeer" },
    "métal": { fr: "métal", en: "metal", wo: "mettal" },
    "or": { fr: "or", en: "gold", wo: "wuru" },
    "argent": { fr: "argent", en: "silver", wo: "sëmën" },
    "cuivre": { fr: "cuivre", en: "copper", wo: "ciwër" },
    "bronze": { fr: "bronze", en: "bronze", wo: "bronz" },
    "terre cuite": { fr: "terre cuite", en: "terracotta", wo: "ñiin bu fas" },
    "céramique": { fr: "céramique", en: "ceramic", wo: "seramik" },
    "coton": { fr: "coton", en: "cotton", wo: "koton" },
    "perles": { fr: "perles", en: "beads", wo: "perle" },
    
    // Époques et périodes
    "traditionnel": { fr: "traditionnel", en: "traditional", wo: "cosaan" },
    "ancien": { fr: "ancien", en: "ancient", wo: "cosaan" },
    "moderne": { fr: "moderne", en: "modern", wo: "làkk" },
    "contemporain": { fr: "contemporain", en: "contemporary", wo: "làkk gi" },
    "colonial": { fr: "colonial", en: "colonial", wo: "kolonial" },
    "précolonial": { fr: "précolonial", en: "precolonial", wo: "ëmb koloni" },
    
    // Termes culturels
    "cérémonie": { fr: "cérémonie", en: "ceremony", wo: "ceremoni" },
    "rituel": { fr: "rituel", en: "ritual", wo: "rite" },
    "spirituel": { fr: "spirituel", en: "spiritual", wo: "kersa" },
    "sacré": { fr: "sacré", en: "sacred", wo: "sañ-sañ" },
    "ancestral": { fr: "ancestral", en: "ancestral", wo: "njëkk" },
    "communauté": { fr: "communauté", en: "community", wo: "jëfandikoo" },
    "famille": { fr: "famille", en: "family", wo: "kër" },
    "tradition": { fr: "tradition", en: "tradition", wo: "aada" },
    "culture": { fr: "culture", en: "culture", wo: "aada" },
    "identité": { fr: "identité", en: "identity", wo: "jëmm" },
    "patrimoine": { fr: "patrimoine", en: "heritage", wo: "heritage" },
    "histoire": { fr: "histoire", en: "history", wo: "tarix" },
    
    // Peuples et régions
    "Sénégal": { fr: "Sénégal", en: "Senegal", wo: "Senegaal" },
    "Mali": { fr: "Mali", en: "Mali", wo: "Mali" },
    "Guinée": { fr: "Guinée", en: "Guinea", wo: "Gine" },
    "Nigeria": { fr: "Nigeria", en: "Nigeria", wo: "Najeria" },
    "Ghana": { fr: "Ghana", en: "Ghana", wo: "Gana" },
    "Afrique de l'Ouest": { fr: "Afrique de l'Ouest", en: "West Africa", wo: "Penku Sëngal" },
    "Wolof": { fr: "Wolof", en: "Wolof", wo: "Wolof" },
    "Peul": { fr: "Peul", en: "Fulani", wo: "Peul" },
    "Bambara": { fr: "Bambara", en: "Bambara", wo: "Bambara" },
    "Dogon": { fr: "Dogon", en: "Dogon", wo: "Dogon" },
    "Yoruba": { fr: "Yoruba", en: "Yoruba", wo: "Yoruba" },
    "Mandingue": { fr: "Mandingue", en: "Mandinka", wo: "Mandingue" },
    "Ashanti": { fr: "Ashanti", en: "Ashanti", wo: "Ashanti" },
    
    // Actions et concepts
    "créer": { fr: "créer", en: "create", wo: "def" },
    "sculpter": { fr: "sculpter", en: "sculpt", wo: "sëriñ" },
    "tisser": { fr: "tisser", en: "weave", wo: "tiss" },
    "porter": { fr: "porter", en: "wear", wo: "takk" },
    "utiliser": { fr: "utiliser", en: "use", wo: "jëfandikoo" },
    "représenter": { fr: "représenter", en: "represent", wo: "melni" },
    "témoigner": { fr: "témoigner", en: "testify", wo: "wane" },
    "transmettre": { fr: "transmettre", en: "transmit", wo: "yàmb" },
    "honorer": { fr: "honorer", en: "honor", wo: "wone" },
    "célébrer": { fr: "célébrer", en: "celebrate", wo: "celebration" },
    
    // Qualificatifs
    "magnifique": { fr: "magnifique", en: "magnificent", wo: "rafet na" },
    "vibrant": { fr: "vibrant", en: "vibrant", wo: "yomb" },
    "complexe": { fr: "complexe", en: "complex", wo: "nguur" },
    "unique": { fr: "unique", en: "unique", wo: "benn" },
    "important": { fr: "important", en: "important", wo: "mag" },
    "élégant": { fr: "élégant", en: "elegant", wo: "rafet" },
    "exceptionnel": { fr: "exceptionnel", en: "exceptional", wo: "mag na" },
    "géométrique": { fr: "géométrique", en: "geometric", wo: "geometrik" },
    "multicolore": { fr: "multicolore", en: "multicolored", wo: "melaxat yu bare" },
    "brodé": { fr: "brodé", en: "embroidered", wo: "xànjar" }
  };
  
  // Traduction contextuelle avec intelligence
  async translateText(text: string, targetLang: Language): Promise<string> {
    if (this.apiKey === "demo-key") {
      return this.intelligentTranslation(text, targetLang);
    }
    
    try {
      // En production, combiner API + dictionnaire culturel
      const baseTranslation = await this.callExternalAPI(text, targetLang);
      return this.enhanceWithCulturalDictionary(baseTranslation, targetLang);
    } catch (error) {
      console.error("Erreur lors de la traduction:", error);
      return this.intelligentTranslation(text, targetLang);
    }
  }

  // Traduire un objet contenant des descriptions dans différentes langues
  async translateDescriptions(
    description: string, 
    sourceLang: Language = "fr"
  ): Promise<Record<Language, string>> {
    const languages: Language[] = ["fr", "en", "wo"];
    const translations: Record<Language, string> = {
      fr: description,
      en: description,
      wo: description
    };

    // Traduire vers chaque langue cible (sauf la langue source)
    for (const lang of languages) {
      if (lang !== sourceLang) {
        translations[lang] = await this.translateText(description, lang);
      }
    }

    return translations;
  }

  // Traduction intelligente avec dictionnaire culturel
  private intelligentTranslation(text: string, targetLang: Language): string {
    if (!text || text.trim().length === 0) return text;
    
    let translatedText = text;
    
    // Remplacer les termes du dictionnaire culturel
    Object.entries(this.culturalDictionary).forEach(([sourceTerm, translations]) => {
      const regex = new RegExp(`\\b${this.escapeRegex(sourceTerm)}\\b`, 'gi');
      if (regex.test(translatedText)) {
        translatedText = translatedText.replace(regex, translations[targetLang] || sourceTerm);
      }
    });
    
    // Traductions de phrases complètes communes
    const phraseDictionary = this.getPhraseTranslations(targetLang);
    Object.entries(phraseDictionary).forEach(([sourcePhrase, targetPhrase]) => {
      const regex = new RegExp(this.escapeRegex(sourcePhrase), 'gi');
      translatedText = translatedText.replace(regex, targetPhrase);
    });
    
    // Post-traitement pour améliorer la fluidité
    translatedText = this.postProcessTranslation(translatedText, targetLang);
    
    return translatedText;
  }
  
  // Dictionnaire de phrases complètes
  private getPhraseTranslations(targetLang: Language): Record<string, string> {
    const phrases: Record<Language, Record<string, string>> = {
      en: {
        "Cette magnifique sculpture": "This magnificent sculpture",
        "Ce masque vibrant": "This vibrant mask",
        "Ce textile aux motifs": "This textile with patterns",
        "Cette œuvre représente": "This artwork represents",
        "témoigne de": "testifies to",
        "Les motifs géométriques": "The geometric patterns",
        "reflètent la maîtrise": "reflect the mastery",
        "des artisans de l'époque": "of the artisans of the time",
        "Créée au": "Created in the",
        "cette œuvre témoigne": "this work testifies",
        "richesse culturelle": "cultural richness",
        "transmise de génération en génération": "passed down from generation to generation",
        "avant d'être acquise": "before being acquired",
        "par le musée": "by the museum",
        "jouaient un rôle central": "played a central role",
        "dans les cérémonies": "in ceremonies",
        "représentaient souvent": "often represented",
        "figures spirituelles importantes": "important spiritual figures",
        "Utilisé lors de": "Used during",
        "cérémonies d'initiation": "initiation ceremonies",
        "a voyagé à travers": "traveled through",
        "plusieurs régions": "several regions",
        "rejoindre la collection": "join the collection",
        "servaient de pont": "served as a bridge",
        "entre le monde physique et spirituel": "between the physical and spiritual world",
        "portés par des danseurs": "worn by dancers",
        "lors de rituels sacrés": "during sacred rituals",
        "selon des techniques ancestrales": "using ancestral techniques",
        "destiné aux occasions spéciales": "intended for special occasions",
        "célébrations importantes": "important celebrations",
        "jouent un rôle essentiel": "play an essential role",
        "dans l'expression de": "in expressing",
        "statut social": "social status",
        "sociétés ouest-africaines": "West African societies"
      },
      wo: {
        "Cette magnifique sculpture": "Sëriñ bii bu rafet la",
        "Ce masque vibrant": "Mask bii bu rafet ak melaxat yu yomb",
        "Ce textile aux motifs": "Tiil bii ak motif yi rafet",
        "Cette œuvre représente": "Liggéey bii dafay wonee",
        "témoigne de": "dafay wane",
        "Les motifs géométriques": "Motif yi geometrik",
        "reflètent la maîtrise": "dafay wanee xam-xam bu",
        "des artisans de l'époque": "artisan yi ci jamano jii",
        "Créée au": "Defar naa ko ci",
        "cette œuvre témoigne": "liggéey bii dafay wane",
        "richesse culturelle": "naat bu aada",
        "transmise de génération en génération": "yàmb naañu ko ci benn aw te jox ci beneen aw",
        "avant d'être acquise": "ba musée bi jënd ko",
        "par le musée": "musée bi",
        "jouaient un rôle central": "am naañu benn jikko bu mag",
        "dans les cérémonies": "ci ceremoni yi",
        "représentaient souvent": "dañu doy wonee",
        "figures spirituelles importantes": "ay jom-jom bu kersa yu mag na",
        "Utilisé lors de": "Jëfandikoo nañu ko ci",
        "cérémonies d'initiation": "ceremoni yu bokkoon",
        "a voyagé à travers": "dem na ci",
        "plusieurs régions": "bare ndajar",
        "rejoindre la collection": "dugg ci koleksion bi",
        "servaient de pont": "jëfandikoo nañu koy ngir yoon",
        "entre le monde physique et spirituel": "ci ëlb aduna bi ak bi kersa",
        "portés par des danseurs": "danseer yi takk nañu koy",
        "lors de rituels sacrés": "ci rite yu sañ-sañ",
        "selon des techniques ancestrales": "jël technique yu ndeysaan",
        "destiné aux occasions spéciales": "def nañu ko ngir ay jamano yu gëm",
        "célébrations importantes": "ngoon yu mag",
        "jouent un rôle essentiel": "am nañu benn jikko bu mag",
        "dans l'expression de": "ngir melni",
        "statut social": "barab ci jëfandikoo",
        "sociétés ouest-africaines": "société yu fukk gi Afrig"
      },
      fr: {} // Pas besoin de traduire vers le français si c'est déjà en français
    };
    
    return phrases[targetLang] || {};
  }
  
  // Post-traitement pour améliorer la traduction
  private postProcessTranslation(text: string, targetLang: Language): string {
    let processedText = text;
    
    // Corrections spécifiques par langue
    if (targetLang === 'en') {
      // Corrections pour l'anglais
      processedText = processedText.replace(/\bthis works\b/gi, 'this work');
      processedText = processedText.replace(/\ban artist\b/gi, 'an artisan');
      processedText = processedText.replace(/\bof the museum\b/gi, 'by the museum');
    } else if (targetLang === 'wo') {
      // Corrections pour le wolof
      processedText = processedText.replace(/\s+/g, ' '); // Supprimer les espaces multiples
      processedText = processedText.replace(/\bci\s+ci\b/gi, 'ci'); // Éviter la répétition
    }
    
    // Nettoyer les espaces en trop
    processedText = processedText.trim().replace(/\s+/g, ' ');
    
    return processedText;
  }
  
  // Échapper les caractères spéciaux pour regex
  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Appel API externe (pour production)
  private async callExternalAPI(text: string, targetLang: Language): Promise<string> {
    // À implémenter avec un vrai service de traduction
    throw new Error('API externe non configurée');
  }
  
  // Améliorer avec le dictionnaire culturel
  private enhanceWithCulturalDictionary(text: string, targetLang: Language): string {
    return this.intelligentTranslation(text, targetLang);
  }
}

export const translationService = new TranslationService();
export default translationService;