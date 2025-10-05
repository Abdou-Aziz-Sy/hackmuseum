import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Image, 
  Tag, 
  Calendar, 
  Bell, 
  Users, 
  Settings,
  Menu,
  X,
  LogOut,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import hommeImage from "@/assets/homme.jpg";
import OptimizedImage from "@/components/OptimizedImage";

const AdminNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  const navigationItems = [
    {
      name: "Tableau de bord",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Gestion des œuvres",
      href: "/admin/artworks",
      icon: Image,
    },
    {
      name: "Gestion avancée",
      href: "/admin/advanced-artworks",
      icon: BarChart3,
    },
    {
      name: "Gestion des catégories",
      href: "/admin/categories",
      icon: Tag,
    },
    {
      name: "Réservations",
      href: "/admin/reservations",
      icon: Calendar,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/admin" className="flex items-center gap-3 font-serif text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            <OptimizedImage 
              src={hommeImage} 
              alt="MCN Admin Logo" 
              className="w-10 h-10 rounded-full border-2 border-primary/20"
            />
            <span>MCN Admin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* User menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">Administrateur</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in-up">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                asChild
                variant={isActive(item.href) ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setIsOpen(false)}
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="text-sm mb-2">
                <p className="font-medium">{user.name}</p>
                <p className="text-muted-foreground text-xs">Administrateur</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavigation;
