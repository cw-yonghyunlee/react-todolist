import React, { useState } from 'react';
import Button from '../atoms/Button';
import ToDoForm from './ToDoForm';
import { UseFormFieldValues } from '../../types/form';

function AddToDoForm({
  submitButtonLabel,
  onSubmit,
}: {
  submitButtonLabel: string;
  onSubmit: (values: UseFormFieldValues) => void;
}): JSX.Element {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  return (
    <article className="add-container">
      {isVisibleForm && (
        <ToDoForm submitButtonLabel="추가" onSubmit={onSubmit} />
      )}
      <Button
        className={`circle-button ${isVisibleForm ? 'active' : ''}`}
        onClick={(): void => setIsVisibleForm(!isVisibleForm)}
      >
        {submitButtonLabel}
      </Button>
    </article>
  );
}

export default AddToDoForm;
