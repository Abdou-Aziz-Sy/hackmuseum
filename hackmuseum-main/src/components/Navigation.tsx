import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Languages, User, LogOut, Calendar, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import hommeImage from "@/assets/homme.jpg";
import OptimizedImage from "@/components/OptimizedImage";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const languages: { code: Language; label: string }[] = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "wo", label: "Wolof" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Navigation Toggle - Left side on mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          <Link to="/" className="flex items-center gap-3 font-serif text-xl font-bold text-primary hover:opacity-80 transition-opacity md:ml-0">
            <img 
              src="/logo-mcn.png" 
              alt="MCN Logo" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors">
              {t("gallery")}
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              {t("about")}
            </Link>
            <Link to="/site-qr" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
              <QrCode className="h-4 w-4" />
              QR Code
            </Link>
            {user?.role === 'admin' ? (
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <User className="h-4 w-4" />
                Administration
              </Link>
            ) : (
              <Link to="/reservation" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Réservation
              </Link>
            )}

            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Languages className="h-4 w-4" />
                    {languages.find((l) => l.code === language)?.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? "bg-muted" : ""}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Mon profil
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Administration
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild size="sm">
                  <Link to="/login">{t("login")}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Language Selector - Right side on mobile */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 px-2">
                  <Languages className="h-5 w-5" />
                  <span className="text-xs">{languages.find((l) => l.code === language)?.label.slice(0, 2)}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={language === lang.code ? "bg-muted" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden p-4 pt-0 pb-6 space-y-4 border-b border-border bg-background/95 backdrop-blur-md">
          <Link
            to="/"
            className="block py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("home")}
          </Link>
          <Link
            to="/gallery"
            className="block py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("gallery")}
          </Link>
          <Link
            to="/about"
            className="block py-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("about")}
          </Link>
          <Link
            to="/site-qr"
            className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <QrCode className="h-4 w-4" />
            QR Code
          </Link>
          {user?.role === 'admin' ? (
            <Link
              to="/admin"
              className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              Administration
            </Link>
          ) : (
            <Link
              to="/reservation"
              className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="h-4 w-4" />
              Réservation
            </Link>
          )}

          <div className="pt-2 border-t border-border">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("language")}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Languages className="h-4 w-4" />
                      {languages.find((l) => l.code === language)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={language === lang.code ? "bg-muted" : ""}
                      >
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Mon profil
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("logout")}
                  </Button>
                </div>
              ) : (
                <Button asChild size="sm" className="w-full">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    {t("login")}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
