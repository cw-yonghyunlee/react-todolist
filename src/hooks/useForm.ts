import { useEffect, useRef } from 'react';
import {
  HandleSubmit,
  UseFormFieldValues,
  UseFormInterface,
  UseFormReturn,
} from '../types/form';

export default function useForm({
  fieldNames,
}: UseFormInterface): UseFormReturn {
  const formRef = useRef<HTMLFormElement>(null);
  const fields = useRef<UseFormFieldValues>();
  const handleSubmit: HandleSubmit =
    onSubmit =>
    (e): void => {
      e.preventDefault();
      onSubmit(fields.current!);
      formRef.current?.reset();
    };

  useEffect(() => {
    fields.current = fieldNames.reduce((prev, cur) => {
      return {
        ...prev,
        [cur]: formRef.current!.querySelector<HTMLInputElement>(
          `input[name=${cur}]`,
        )!.value,
      };
    }, {});

    const inputElements =
      formRef.current?.querySelectorAll<HTMLInputElement>(`input`);
    inputElements?.forEach(el => {
      el.onchange = (e): void => {
        fields.current![el.name] = (e.target as HTMLInputElement).value;
      };
    });
  }, [fieldNames]);

  return {
    formControl: {
      ref: formRef,
      handleSubmit,
    },
  };
}
