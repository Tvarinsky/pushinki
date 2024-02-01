import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type: string;
  size: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type, size, className }) => {
  return <button className={`${type} ${size} ${className ?? ""}`}>{children}</button>;
};

export default Button;
