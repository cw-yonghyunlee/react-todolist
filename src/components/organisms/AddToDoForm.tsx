import React, { FormEvent, useState } from 'react';
import TextButton from '../atoms/TextButton';
import ToDoForm from '../molecules/ToDoForm';

function AddToDoForm({
  submitButtonLabel,
  onSubmit,
}: {
  submitButtonLabel: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  return (
    <article className="add-container">
      {isVisibleForm && (
        <ToDoForm submitButtonLabel={submitButtonLabel} onSubmit={onSubmit} />
      )}
      <TextButton
        title="+"
        className={`circle-button ${isVisibleForm ? 'active' : ''}`}
        onClick={(): void => setIsVisibleForm(!isVisibleForm)}
      />
    </article>
  );
}

export default AddToDoForm;
