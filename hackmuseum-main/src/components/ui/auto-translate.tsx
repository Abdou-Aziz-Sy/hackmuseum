import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Languages, Loader2, CheckCircle, AlertTriangle, Wand2, Copy, RotateCcw } from 'lucide-react';
import { translationService } from '@/services/translation-service';
import { Language } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface MultilingualText {
  fr: string;
  en: string;
  wo: string;
}

interface AutoTranslateProps {
  label: string;
  value: MultilingualText;
  onChange: (value: MultilingualText) => void;
  placeholder?: {
    fr: string;
    en: string;
    wo: string;
  };
  rows?: number;
  disabled?: boolean;
  className?: string;
}

export const AutoTranslate: React.FC<AutoTranslateProps> = ({
  label,
  value,
  onChange,
  placeholder = {
    fr: "Saisir en français...",
    en: "Enter in English...",
    wo: "Bind ci Wolof..."
  },
  rows = 3,
  disabled = false,
  className = ""
}) => {
  const { language } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLang, setSourceLang] = useState<Language>('fr');
  const [translationStatus, setTranslationStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const languages = [
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'wo' as Language, name: 'Wolof', flag: '🇸🇳' }
  ];

  // Traduction automatique
  const handleAutoTranslate = useCallback(async () => {
    const sourceText = value[sourceLang]?.trim();
    
    if (!sourceText) {
      setTranslationStatus({
        success: false,
        message: 'Veuillez saisir du texte dans la langue source avant de traduire.'
      });
      return;
    }

    setIsTranslating(true);
    setTranslationStatus(null);

    try {
      const translations = await translationService.translateDescriptions(sourceText, sourceLang);
      onChange(translations);
      
      setTranslationStatus({
        success: true,
        message: 'Traduction automatique terminée avec succès !'
      });
    } catch (error) {
      setTranslationStatus({
        success: false,
        message: 'Erreur lors de la traduction automatique.'
      });
    } finally {
      setIsTranslating(false);
    }
  }, [value, sourceLang, onChange]);

  // Réinitialiser les traductions
  const handleReset = useCallback(() => {
    onChange({ fr: '', en: '', wo: '' });
    setTranslationStatus(null);
  }, [onChange]);

  // Copier le contenu d'une langue vers une autre
  const handleCopyContent = useCallback((fromLang: Language, toLang: Language) => {
    const content = value[fromLang];
    onChange({
      ...value,
      [toLang]: content
    });
  }, [value, onChange]);

  // Gérer le changement de texte
  const handleTextChange = useCallback((lang: Language, text: string) => {
    onChange({
      ...value,
      [lang]: text
    });
    // Clear status when user starts typing
    if (translationStatus) {
      setTranslationStatus(null);
    }
  }, [value, onChange, translationStatus]);

  // Vérifier si le texte est rempli pour une langue
  const isLanguageFilled = (lang: Language) => value[lang]?.trim().length > 0;

  // Compter les langues remplies
  const filledLanguages = languages.filter(lang => isLanguageFilled(lang.code)).length;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        <Badge variant="outline" className="text-xs">
          {filledLanguages}/3 langues
        </Badge>
      </div>

      {/* Contrôles de traduction */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Traduction automatique
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Langue source :</Label>
              <Select value={sourceLang} onValueChange={(value) => setSourceLang(value as Language)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span className="text-xs">{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAutoTranslate}
                disabled={isTranslating || disabled}
                className="flex items-center gap-2"
              >
                {isTranslating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Wand2 className="h-3 w-3" />
                )}
                {isTranslating ? 'Traduction...' : 'Traduire'}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                disabled={disabled}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            </div>
          </div>

          {/* Messages de statut */}
          {translationStatus && (
            <Alert className={translationStatus.success ? 'border-green-200 bg-green-50' : ''} 
                  variant={translationStatus.success ? 'default' : 'destructive'}>
              {translationStatus.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription className={translationStatus.success ? 'text-green-700' : ''}>
                {translationStatus.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tabs pour les différentes langues */}
      <Tabs defaultValue="fr" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {languages.map(lang => (
            <TabsTrigger key={lang.code} value={lang.code} className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span className="hidden sm:inline">{lang.name}</span>
              {isLanguageFilled(lang.code) && (
                <CheckCircle className="h-3 w-3 text-green-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {languages.map(lang => (
          <TabsContent key={lang.code} value={lang.code} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                {lang.name} {lang.flag}
              </Label>
              {/* Options de copie */}
              <div className="flex gap-1">
                {languages
                  .filter(otherLang => otherLang.code !== lang.code && isLanguageFilled(otherLang.code))
                  .map(otherLang => (
                    <Button
                      key={otherLang.code}
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs"
                      onClick={() => handleCopyContent(otherLang.code, lang.code)}
                      title={`Copier depuis ${otherLang.name}`}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      {otherLang.flag}
                    </Button>
                  ))
                }
              </div>
            </div>
            
            <Textarea
              placeholder={placeholder[lang.code]}
              value={value[lang.code] || ''}
              onChange={(e) => handleTextChange(lang.code, e.target.value)}
              rows={rows}
              disabled={disabled}
              className={`w-full ${isLanguageFilled(lang.code) ? 'border-green-300' : ''}`}
            />
            
            {value[lang.code] && (
              <div className="text-xs text-muted-foreground text-right">
                {value[lang.code].length} caractères
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AutoTranslate;