import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IauthState {
  token: string;
  user: object;
}
interface IsingInCredentials {
  email: string;
  password: string;
}
interface IauthContext {
  user: object;
  signIn(credentials: IsingInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IauthContext>({} as IauthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IauthState>(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as IauthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');
    setData({} as IauthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IauthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAhth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
