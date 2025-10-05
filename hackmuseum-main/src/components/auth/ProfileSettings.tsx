import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotificationStore } from "@/services/notification-service";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

const ProfileSettings = () => {
  const { addNotification } = useNotificationStore();
  const { user, updateUserProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de mise à jour du profil
    setTimeout(() => {
      // Dans un cas réel, vous appelleriez updateUserProfile avec les nouvelles données
      addNotification({
        title: "Profil mis à jour",
        message: "Vos informations personnelles ont été mises à jour avec succès.",
        type: "success",
        priority: "medium",
        category: "user",
        dismissible: true,
        autoClose: true
      });
    }, 500);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification({
        title: "Erreur",
        message: "Les mots de passe ne correspondent pas.",
        type: "error",
        priority: "high",
        category: "user",
        dismissible: true,
        autoClose: true
      });
      return;
    }
    
    // Simulation de changement de mot de passe
    setTimeout(() => {
      // Dans un cas réel, vous appelleriez une fonction pour changer le mot de passe
      addNotification({
        title: "Mot de passe modifié",
        message: "Votre mot de passe a été modifié avec succès.",
        type: "success",
        priority: "medium",
        category: "user",
        dismissible: true,
        autoClose: true
      });
      
      // Réinitialiser les champs
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Informations personnelles</TabsTrigger>
            <TabsTrigger value="password">Mot de passe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>
                  Modifiez vos informations de profil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                    <Input 
                      id="name" 
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      placeholder="Votre nom"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email} 
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      placeholder="votre.email@example.com"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Mettre à jour le profil
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
                <CardDescription>
                  Mettez à jour votre mot de passe pour sécuriser votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="current-password" className="text-sm font-medium">Mot de passe actuel</label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={passwordData.currentPassword} 
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="new-password" className="text-sm font-medium">Nouveau mot de passe</label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={passwordData.newPassword} 
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Confirmer le mot de passe</label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={passwordData.confirmPassword} 
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Changer le mot de passe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProfileSettings;