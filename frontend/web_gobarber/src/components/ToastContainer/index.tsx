import React from 'react';
import { useTransition } from 'react-spring';
import { ItoastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface ItoastContainerProps {
  messages: ItoastMessage[];
}
const ToastContainer: React.FC<ItoastContainerProps> = ({ messages }) => {
  const messageWithTransition = useTransition(messages, message => message.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });
  return (
    <Container>
      {messageWithTransition.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
