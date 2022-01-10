import React from 'react';

function TextButton({
  title,
  onClick,
  type,
}: {
  title: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}): JSX.Element {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
}

export default TextButton;
