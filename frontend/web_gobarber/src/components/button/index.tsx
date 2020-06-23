import React, { ButtonHTMLAttributes } from 'react';

// type substitui a interface quando não é alterado propriedades padrões
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
);

export default Button;
