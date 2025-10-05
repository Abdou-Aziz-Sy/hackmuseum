import { useState } from "react";
import { Save, Download, Upload, Trash2, Shield, Database, Globe, Bell, Users, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdminNavigation from "@/components/AdminNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const Settings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    // Général
    siteName: "Musée des Civilisations Noires",
    siteDescription: "Découvrez le patrimoine culturel africain",
    defaultLanguage: "fr",
    timezone: "Africa/Dakar",
    
    // Sécurité
    sessionTimeout: 30,
    twoFactorAuth: true,
    passwordPolicy: "strong",
    loginAttempts: 5,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    maintenanceAlerts: true,
    userActivityAlerts: true,
    
    // Apparence
    theme: "light",
    primaryColor: "#d2691e",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    
    // Performance
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: false,
    analyticsEnabled: true,
    
    // Sauvegarde
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: 30,
    cloudBackup: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Paramètres sauvegardés avec succès");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Configuration exportée");
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast.success("Configuration importée avec succès");
        } catch (error) {
          toast.error("Fichier de configuration invalide");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="space-y-6">
          {/* En-tête */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Paramètres du Système</h1>
              <p className="text-muted-foreground mt-2">
                Gérez la configuration globale de votre plateforme
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <label htmlFor="import-settings">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Importer
                  </span>
                </Button>
              </label>
              <input
                id="import-settings"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="backup">Sauvegarde</TabsTrigger>
            </TabsList>

            {/* Général */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Configuration Générale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Nom du Site</Label>
                      <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defaultLanguage">Langue par Défaut</Label>
                      <Select value={settings.defaultLanguage} onValueChange={(value) => setSettings({...settings, defaultLanguage: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="wo">Wolof</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Description du Site</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau Horaire</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Dakar">Dakar (GMT+0)</SelectItem>
                        <SelectItem value="Europe/Paris">Paris (GMT+1)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sécurité */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Paramètres de Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Délai d'Expiration de Session (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Tentatives de Connexion Max</Label>
                      <Input
                        id="loginAttempts"
                        type="number"
                        value={settings.loginAttempts}
                        onChange={(e) => setSettings({...settings, loginAttempts: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorAuth">Authentification à Deux Facteurs</Label>
                        <p className="text-sm text-muted-foreground">Renforce la sécurité des comptes administrateurs</p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="passwordPolicy">Politique de Mot de Passe</Label>
                      <Select value={settings.passwordPolicy} onValueChange={(value) => setSettings({...settings, passwordPolicy: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basique (6 caractères)</SelectItem>
                          <SelectItem value="medium">Moyen (8 caractères, majuscules, chiffres)</SelectItem>
                          <SelectItem value="strong">Fort (12 caractères, symboles)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Configuration des Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Notifications par Email</Label>
                        <p className="text-sm text-muted-foreground">Recevoir les alertes par email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Notifications Push</Label>
                        <p className="text-sm text-muted-foreground">Alertes en temps réel dans le navigateur</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceAlerts">Alertes de Maintenance</Label>
                        <p className="text-sm text-muted-foreground">Notifications pour les opérations de maintenance</p>
                      </div>
                      <Switch
                        id="maintenanceAlerts"
                        checked={settings.maintenanceAlerts}
                        onCheckedChange={(checked) => setSettings({...settings, maintenanceAlerts: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="userActivityAlerts">Alertes d'Activité Utilisateur</Label>
                        <p className="text-sm text-muted-foreground">Notifications pour les actions importantes des utilisateurs</p>
                      </div>
                      <Switch
                        id="userActivityAlerts"
                        checked={settings.userActivityAlerts}
                        onCheckedChange={(checked) => setSettings({...settings, userActivityAlerts: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Apparence */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Personnalisation de l'Apparence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Thème</Label>
                      <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Clair</SelectItem>
                          <SelectItem value="dark">Sombre</SelectItem>
                          <SelectItem value="auto">Automatique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Couleur Principale</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={settings.primaryColor}
                          onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="logoUrl">URL du Logo</Label>
                      <Input
                        id="logoUrl"
                        value={settings.logoUrl}
                        onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="faviconUrl">URL du Favicon</Label>
                      <Input
                        id="faviconUrl"
                        value={settings.faviconUrl}
                        onChange={(e) => setSettings({...settings, faviconUrl: e.target.value})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance */}
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Optimisation des Performances
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cacheEnabled">Cache Activé</Label>
                        <p className="text-sm text-muted-foreground">Améliore les performances en mettant en cache les données</p>
                      </div>
                      <Switch
                        id="cacheEnabled"
                        checked={settings.cacheEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, cacheEnabled: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="compressionEnabled">Compression Activée</Label>
                        <p className="text-sm text-muted-foreground">Compresse les fichiers pour réduire la bande passante</p>
                      </div>
                      <Switch
                        id="compressionEnabled"
                        checked={settings.compressionEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, compressionEnabled: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cdnEnabled">CDN Activé</Label>
                        <p className="text-sm text-muted-foreground">Utilise un réseau de distribution de contenu</p>
                      </div>
                      <Switch
                        id="cdnEnabled"
                        checked={settings.cdnEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, cdnEnabled: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analyticsEnabled">Analytics Activé</Label>
                        <p className="text-sm text-muted-foreground">Collecte des données d'utilisation</p>
                      </div>
                      <Switch
                        id="analyticsEnabled"
                        checked={settings.analyticsEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, analyticsEnabled: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sauvegarde */}
            <TabsContent value="backup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Gestion des Sauvegardes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoBackup">Sauvegarde Automatique</Label>
                        <p className="text-sm text-muted-foreground">Sauvegarde automatique des données</p>
                      </div>
                      <Switch
                        id="autoBackup"
                        checked={settings.autoBackup}
                        onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Fréquence de Sauvegarde</Label>
                        <Select value={settings.backupFrequency} onValueChange={(value) => setSettings({...settings, backupFrequency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Horaire</SelectItem>
                            <SelectItem value="daily">Quotidienne</SelectItem>
                            <SelectItem value="weekly">Hebdomadaire</SelectItem>
                            <SelectItem value="monthly">Mensuelle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="retentionPeriod">Période de Rétention (jours)</Label>
                        <Input
                          id="retentionPeriod"
                          type="number"
                          value={settings.retentionPeriod}
                          onChange={(e) => setSettings({...settings, retentionPeriod: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cloudBackup">Sauvegarde Cloud</Label>
                        <p className="text-sm text-muted-foreground">Sauvegarde dans le cloud pour plus de sécurité</p>
                      </div>
                      <Switch
                        id="cloudBackup"
                        checked={settings.cloudBackup}
                        onCheckedChange={(checked) => setSettings({...settings, cloudBackup: checked})}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Actions de Sauvegarde</h4>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Créer une Sauvegarde
                      </Button>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Restaurer
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Nettoyer les Anciennes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
