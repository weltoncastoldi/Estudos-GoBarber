import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface IsingInCredentials {
  email: string;
  password: string;
}
interface IauthContext {
  name: string;
  signIn(credentials: IsingInCredentials): Promise<void>;
}

const AuthContext = createContext<IauthContext>({} as IauthContext);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });
    console.log(response.data);

    const { token, user } = response.data;
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'wetlon', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
