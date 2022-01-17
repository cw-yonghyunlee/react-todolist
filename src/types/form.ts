import { FormEventHandler, RefObject } from 'react';

type OnSubmit = (fields: UseFormFieldValues) => void;
export type HandleSubmit = (
  onSubmit: OnSubmit,
) => FormEventHandler<HTMLFormElement>;

export interface UseFormInterface {
  fieldNames: Readonly<string[]>;
}

export interface UseFormReturn {
  formControl: {
    ref: RefObject<HTMLFormElement>;
    handleSubmit: HandleSubmit;
  };
}

export type UseFormFieldValues = Record<string, string | null | undefined>;
