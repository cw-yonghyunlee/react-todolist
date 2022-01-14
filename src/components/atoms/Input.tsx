import React, { HTMLInputTypeAttribute } from 'react';

interface LabelInputProps {
  title: string;
  name: string;
  inputType?: HTMLInputTypeAttribute;
  required?: boolean;
}

function Input({
  title,
  name,
  inputType,
  required,
}: LabelInputProps): JSX.Element {
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input name={name} type={inputType || 'text'} required={required} />
    </>
  );
}

export default Input;
