import React, { createContext, useCallback, useState } from 'react';
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
    console.log(response.data);

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
