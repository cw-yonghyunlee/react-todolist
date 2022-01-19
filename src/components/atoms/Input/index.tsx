import { HTMLInputTypeAttribute } from 'react';
import useInput from '../../../hooks/useInput';

interface LabelInputProps {
  title: string;
  name: string;
  initialValue?: string;
  inputType?: HTMLInputTypeAttribute;
  required?: boolean;
}

function Input(props: LabelInputProps): JSX.Element {
  const { title, name, inputType, required, initialValue } = props;
  const input = useInput(initialValue);

  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        name={name}
        type={inputType || 'text'}
        required={required}
        {...input}
      />
    </>
  );
}

export default Input;
