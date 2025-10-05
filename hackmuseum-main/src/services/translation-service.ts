import { Language } from "@/contexts/LanguageContext";

// Service de traduction automatique
class TranslationService {
  private apiKey: string = "demo-key"; // Remplacer par une vraie clé API en production

  // Traduire un texte vers une langue cible
  async translateText(text: string, targetLang: Language): Promise<string> {
    // En mode démo, on simule la traduction
    if (this.apiKey === "demo-key") {
      return this.simulateTranslation(text, targetLang);
    }

    try {
      // Ici, vous implémenteriez l'appel à une API de traduction réelle
      // comme Google Translate, DeepL, etc.
      
      // Exemple avec l'API Google Translate (à implémenter en production)
      /*
      const response = await fetch(`https://translation-api.example.com/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          text,
          target: targetLang
        })
      });
      
      const data = await response.json();
      return data.translatedText;
      */
      
      return this.simulateTranslation(text, targetLang);
    } catch (error) {
      console.error("Erreur lors de la traduction:", error);
      return text; // En cas d'erreur, retourner le texte original
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

  // Simulation de traduction pour la démo
  private simulateTranslation(text: string, targetLang: Language): string {
    // Préfixes pour simuler la traduction
    const prefixes: Record<Language, string> = {
      fr: "FR: ",
      en: "EN: ",
      wo: "WO: "
    };

    // Simuler des traductions pour la démo
    const demoTranslations: Record<string, Record<Language, string>> = {
      "Bienvenue au musée": {
        fr: "Bienvenue au musée",
        en: "Welcome to the museum",
        wo: "Dalal ak diam ci musée bi"
      },
      "Cette œuvre représente": {
        fr: "Cette œuvre représente",
        en: "This artwork represents",
        wo: "Lii dafay wonee"
      }
    };

    // Vérifier si nous avons une traduction de démo pour ce texte
    for (const key in demoTranslations) {
      if (text.includes(key) && demoTranslations[key][targetLang]) {
        return text.replace(key, demoTranslations[key][targetLang]);
      }
    }

    // Si aucune correspondance, ajouter simplement un préfixe pour simuler
    return `${prefixes[targetLang]}${text}`;
  }
}

export const translationService = new TranslationService();
export default translationService;