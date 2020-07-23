import React from 'react';
import { ItoastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface ItoastContainerProps {
  messages: ItoastMessage[];
}
const ToastContainer: React.FC<ItoastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map(message => (
        <Toast key={message.id} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
