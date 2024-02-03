import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type: string;
  size: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type, size, className, onClick }) => {
  return <button onClick={onClick} className={`${type} ${size} ${className ?? ""}`}>{children}</button>;
};

export default Button;
