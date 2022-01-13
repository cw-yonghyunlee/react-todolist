import React, { FormEvent } from 'react';
import TextButton from './common/TextButton';
import LabelInput from './common/LabelInput';

function ToDoForm({
  submitButtonLabel,
  onSubmit,
}: {
  submitButtonLabel: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
  return (
    <form onSubmit={onSubmit}>
      <LabelInput title="할 일" name="description" required={true} />
      <LabelInput
        title="만료일"
        name="expiredDate"
        inputType="date"
        required={true}
      />
      <TextButton
        title={submitButtonLabel}
        className="submit-button"
        type="submit"
      />
    </form>
  );
}

export default ToDoForm;
