import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthState, LoginCredentials, RegisterData } from "@/types/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Simuler une vérification du token
          const userData = localStorage.getItem('user_data');
          if (userData) {
            const user = JSON.parse(userData);
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pour la démo, accepter admin@musee.sn / password123 ou tout autre email avec password123
      if (credentials.email === 'admin@musee.sn' && credentials.password === 'password123') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Administrateur',
          role: 'admin',
          createdAt: new Date(),
          isActive: true,
        };
        
        localStorage.setItem('auth_token', 'demo_token');
        localStorage.setItem('user_data', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else if (credentials.password === 'password123') {
        // Tout utilisateur avec le bon mot de passe est accepté
        const user: User = {
          id: Math.floor(Math.random() * 1000).toString(),
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: 'user',
          createdAt: new Date(),
          isActive: true,
        };
        
        localStorage.setItem('auth_token', 'demo_token');
        localStorage.setItem('user_data', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      if (data.password !== data.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      
      // Simuler une API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: 'user',
        createdAt: new Date(),
        isActive: true,
      };
      
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('user_data', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!authState.user) return;
    
    const updatedUser = { ...authState.user, ...data };
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
    setAuthState(prev => ({ ...prev, user: updatedUser }));
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
