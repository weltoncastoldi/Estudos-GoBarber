import React, { createContext, useCallback } from 'react';

interface IauthContext {
  name: string;
  signIn(): void;
}

export const AuthContext = createContext<IauthContext>({} as IauthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(() => {
    console.log('singin');
  }, []);
  return (
    <AuthContext.Provider value={{ name: 'wetlon', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
