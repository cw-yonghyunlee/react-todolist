import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

function Button(props: ButtonProps): JSX.Element {
  const { children, ...otherProps } = props;
  return <button {...otherProps}>{children}</button>;
}

export default Button;
