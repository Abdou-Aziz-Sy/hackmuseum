import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Trash2, Edit, Eye, UserPlus, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNotificationStore } from "@/services/notification-service";
import AdminNavigation from "@/components/AdminNavigation";

// Types pour les utilisateurs
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "visitor";
  status: "active" | "inactive" | "pending";
  lastLogin?: string;
  createdAt: string;
}

// Données de démonstration
const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-11-10T14:30:00Z",
    createdAt: "2023-01-15T10:00:00Z"
  },
  {
    id: "user-002",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    role: "editor",
    status: "active",
    lastLogin: "2023-11-09T09:15:00Z",
    createdAt: "2023-02-20T11:30:00Z"
  },
  {
    id: "user-003",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    role: "visitor",
    status: "inactive",
    lastLogin: "2023-10-25T16:45:00Z",
    createdAt: "2023-03-05T14:20:00Z"
  }
];

// Formater la date pour l'affichage
const formatDate = (dateString?: string) => {
  if (!dateString) return "Jamais";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
  }).format(date);
};

// Obtenir la couleur du badge en fonction du rôle
const getRoleBadgeColor = (role: User["role"]) => {
  switch (role) {
    case "admin": return "bg-purple-500";
    case "editor": return "bg-blue-500";
    case "visitor": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

// Obtenir le libellé du rôle
const getRoleLabel = (role: User["role"]) => {
  switch (role) {
    case "admin": return "Administrateur";
    case "editor": return "Éditeur";
    case "visitor": return "Visiteur";
    default: return role;
  }
};

// Obtenir la couleur du badge en fonction du statut
const getStatusBadgeColor = (status: User["status"]) => {
  switch (status) {
    case "active": return "bg-green-500";
    case "inactive": return "bg-red-500";
    case "pending": return "bg-yellow-500";
    default: return "bg-gray-500";
  }
};

// Obtenir le libellé du statut
const getStatusLabel = (status: User["status"]) => {
  switch (status) {
    case "active": return "Actif";
    case "inactive": return "Inactif";
    case "pending": return "En attente";
    default: return status;
  }
};

const UserManagement = () => {
  const { addNotification } = useNotificationStore();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<User["role"] | "all">("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "visitor",
    status: "active"
  });

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Supprimer un utilisateur
  const deleteUser = (id: string) => {
    const user = users.find(u => u.id === id);
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    
    if (user) {
      addNotification({
        title: "Utilisateur supprimé",
        message: `Le compte de ${user.name} a été supprimé.`,
        type: "warning",
        priority: "high",
        category: "user",
        dismissible: true,
        autoClose: false
      });
    }
    
    setIsDeleteOpen(false);
  };
  
  // Ajouter un nouvel utilisateur
  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      addNotification({
        title: "Erreur",
        message: "Veuillez remplir tous les champs obligatoires",
        type: "error",
        priority: "high",
        category: "user",
        dismissible: true,
        autoClose: true
      });
      return;
    }
    
    const user: User = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role || "visitor",
      status: newUser.status || "active",
      createdAt: new Date().toISOString()
    };
    
    setUsers([...users, user]);
    
    addNotification({
      title: "Utilisateur ajouté",
      message: `Le compte de ${user.name} a été créé avec succès.`,
      type: "success",
      priority: "medium",
      category: "user",
      dismissible: true,
      autoClose: true
    });
    
    // Réinitialiser le formulaire
    setNewUser({
      name: "",
      email: "",
      role: "visitor",
      status: "active"
    });
    
    setIsAddUserOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsAddUserOpen(true)}
          >
            <UserPlus size={16} />
            Nouvel utilisateur
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full md:w-48">
            <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
                <SelectItem value="editor">Éditeurs</SelectItem>
                <SelectItem value="visitor">Visiteurs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
            <CardDescription>
              Gérez les comptes utilisateurs et leurs permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilisateur</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {getRoleLabel(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(user.status)}>
                            {getStatusLabel(user.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.lastLogin)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteOpen(true);
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Aucun utilisateur trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Modal de détails */}
      {selectedUser && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Détails de l'utilisateur</DialogTitle>
              <DialogDescription>
                Utilisateur #{selectedUser.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Nom</h4>
                  <p className="text-base">{selectedUser.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                  <p className="text-base">{selectedUser.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Rôle</h4>
                  <Badge className={getRoleBadgeColor(selectedUser.role)}>
                    {getRoleLabel(selectedUser.role)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Statut</h4>
                  <Badge className={getStatusBadgeColor(selectedUser.status)}>
                    {getStatusLabel(selectedUser.status)}
                  </Badge>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDetailsOpen(false)}>
                Fermer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Modal de suppression */}
      {selectedUser && (
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Supprimer l'utilisateur</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p>
                Compte de <strong>{selectedUser.name}</strong> ({selectedUser.email})
              </p>
            </div>
            
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDeleteOpen(false)}>
                Annuler
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => deleteUser(selectedUser.id)}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Modal d'ajout d'utilisateur */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogDescription>
              Créez un nouveau compte utilisateur
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                <Input 
                  id="name" 
                  value={newUser.name || ''} 
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Jean Dupont"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newUser.email || ''} 
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="jean.dupont@example.com"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">Rôle</label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser({...newUser, role: value as User["role"]})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="editor">Éditeur</SelectItem>
                    <SelectItem value="visitor">Visiteur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium">Statut</label>
                <Select 
                  value={newUser.status} 
                  onValueChange={(value) => setNewUser({...newUser, status: value as User["status"]})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAddUserOpen(false)}>
              Annuler
            </Button>
            <Button onClick={addUser}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;