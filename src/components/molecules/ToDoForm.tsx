import React, { FormEvent } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

function ToDoForm({
  submitButtonLabel,
  onSubmit,
}: {
  submitButtonLabel: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
  return (
    <form onSubmit={onSubmit}>
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
