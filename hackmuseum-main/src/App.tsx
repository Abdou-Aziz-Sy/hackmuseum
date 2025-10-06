import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import Scan from "./pages/Scan";
import QRCodes from "./pages/QRCodes";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ProfileSettings from "./components/auth/ProfileSettings";
import Reservation from "./pages/Reservation";
import SiteQR from "./pages/SiteQR";
import Dashboard from "./pages/admin/Dashboard";
import ProfessionalDashboard from "./pages/admin/ProfessionalDashboard";
import ArtworkManagement from "./pages/admin/ArtworkManagement";
import AdvancedArtworkManagement from "./pages/admin/AdvancedArtworkManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ReservationManagement from "./pages/admin/ReservationManagement";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import Notifications from "./pages/admin/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                <Route path="/gallery" element={<ErrorBoundary><Gallery /></ErrorBoundary>} />
                <Route path="/artwork/:id" element={<ErrorBoundary><ArtworkDetail /></ErrorBoundary>} />
                <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                <Route path="/scan" element={<ErrorBoundary><Scan /></ErrorBoundary>} />
                <Route path="/qr-codes" element={<ErrorBoundary><QRCodes /></ErrorBoundary>} />
                <Route path="/site-qr" element={<ErrorBoundary><SiteQR /></ErrorBoundary>} />
                <Route path="/reservation" element={<ErrorBoundary><ProtectedRoute><Reservation /></ProtectedRoute></ErrorBoundary>} />
                
                {/* Auth routes */}
                <Route path="/login" element={<ErrorBoundary><LoginForm /></ErrorBoundary>} />
                <Route path="/register" element={<ErrorBoundary><RegisterForm /></ErrorBoundary>} />
                <Route path="/profile" element={<ErrorBoundary><ProtectedRoute><ProfileSettings /></ProtectedRoute></ErrorBoundary>} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<ErrorBoundary><ProtectedRoute requireAdmin><ProfessionalDashboard /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/artworks" element={<ErrorBoundary><ProtectedRoute requireAdmin><ArtworkManagement /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/advanced-artworks" element={<ErrorBoundary><ProtectedRoute requireAdmin><AdvancedArtworkManagement /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/categories" element={<ErrorBoundary><ProtectedRoute requireAdmin><CategoryManagement /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/reservations" element={<ErrorBoundary><ProtectedRoute requireAdmin><ReservationManagement /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/users" element={<ErrorBoundary><ProtectedRoute requireAdmin><UserManagement /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/settings" element={<ErrorBoundary><ProtectedRoute requireAdmin><Settings /></ProtectedRoute></ErrorBoundary>} />
                <Route path="/admin/notifications" element={<ErrorBoundary><ProtectedRoute requireAdmin><Notifications /></ProtectedRoute></ErrorBoundary>} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<ErrorBoundary><NotFound /></ErrorBoundary>} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
