import { ChangeEventHandler, useState } from 'react';

interface UseInputInterface {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function useInput(
  initialValue: string | undefined,
): UseInputInterface {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
}
