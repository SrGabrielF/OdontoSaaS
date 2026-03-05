import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'dentist' | 'receptionist';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simula a verificação de um token salvo no localStorage ao carregar o app
  useEffect(() => {
    const checkAuth = async () => {
      const savedUser = localStorage.getItem('@OdontoSaaS:user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials: any) => {
    setIsLoading(true);
    // Aqui entraria a chamada ao seu futuro backend:
    // const response = await api.post('/login', credentials);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
    
    const mockUser: User = {
      id: '1',
      name: 'Dr. Carlos Mendes',
      email: 'carlos@odontosaas.com.br',
      role: 'admin'
    };
    
    setUser(mockUser);
    localStorage.setItem('@OdontoSaaS:user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = async () => {
    // Aqui você avisaria o backend para invalidar o token
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    localStorage.removeItem('@OdontoSaaS:user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
