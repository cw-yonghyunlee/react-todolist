import React from 'react';

function Button({
  title,
  className,
  onClick,
  type,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}): JSX.Element {
  return (
    <button type={type} className={className} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
