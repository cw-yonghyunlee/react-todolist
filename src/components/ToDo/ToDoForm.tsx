import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import useForm from '../../hooks/useForm';
import { UseFormFieldValues } from '../../types/form';

const FieldNames: Readonly<string[]> = ['description', 'expiredDate'];

function ToDoForm({
  submitButtonLabel,
  onSubmit,
}: {
  submitButtonLabel: string;
  onSubmit: (fields: UseFormFieldValues) => void;
}): JSX.Element {
  const {
    formControl: { handleSubmit, ref },
  } = useForm({ fieldNames: FieldNames });
  return (
    <form onSubmit={handleSubmit(f => onSubmit(f))} ref={ref}>
      <Input title="할 일" name="description" required={true} />
      <Input
        title="만료일"
        name="expiredDate"
        inputType="date"
        required={true}
      />
      <Button className="submit-button" type="submit">
        {submitButtonLabel}
      </Button>
    </form>
  );
}

export default ToDoForm;
