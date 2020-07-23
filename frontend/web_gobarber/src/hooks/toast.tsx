import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface ItoastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ItoastContextData {
  addToast(message: Omit<ItoastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ItoastContextData>({} as ItoastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ItoastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ItoastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(state => [...state, toast]); // state é o estado anterior + toast estado atual
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id === id));
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ItoastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
