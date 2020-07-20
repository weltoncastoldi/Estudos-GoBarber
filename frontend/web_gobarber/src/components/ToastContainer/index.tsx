import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';
import Button from '../Button';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast>
        <FiAlertCircle size={20} />
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login</p>
        </div>
        <button type="button">
          <FiAlertCircle size={18} />
        </button>
      </Toast>
    </Container>
  );
};

export default ToastContainer;
