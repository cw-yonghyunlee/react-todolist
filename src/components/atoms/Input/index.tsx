import React, { HTMLInputTypeAttribute } from 'react';

interface LabelInputProps {
  title: string;
  name: string;
  inputType?: HTMLInputTypeAttribute;
  required?: boolean;
}

function Input(props: LabelInputProps): JSX.Element {
  const { title, name, inputType, required } = props;

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input name={name} type={inputType || 'text'} required={required} />
    </>
  );
}

export default Input;
