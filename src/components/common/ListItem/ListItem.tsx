import React, { FormEvent, useState } from 'react';
import TextButton from '../TextButton/TextButton';
import ToDoForm from '../../ToDoForm/ToDoForm';

export interface ListItemInterface {
  id: number;
  title: string;
  subTitle?: string;
}

interface ListProps {
  item: ListItemInterface;
  onClick?: (id: number) => void;
  onComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEditSubmit?: (id: number, e: FormEvent<HTMLFormElement>) => void;
}

function ListItem({
  item,
  onComplete,
  onEditSubmit,
  onDelete,
  onClick,
}: ListProps): JSX.Element {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <li
      key={item.id}
      onClick={(): void => onClick?.(item.id)}
      onDoubleClick={(): void => setIsEditMode(!isEditMode)}
    >
      <div>
        {item.title}
        <span>만료일: {item.subTitle}</span>
        {onComplete && (
          <TextButton
            title="완료"
            onClick={(): void => onComplete?.(item.id)}
          />
        )}
        {onEditSubmit && (
          <TextButton
            title="편집"
            className="edit"
            onClick={(): void => setIsEditMode(!isEditMode)}
          />
        )}
        {onDelete && (
          <TextButton
            title="삭제"
            className="delete"
            onClick={(): void => onDelete?.(item.id)}
          />
        )}
      </div>
      {isEditMode && (
        <ToDoForm
          submitButtonLabel="편집"
          onSubmit={(e): void => {
            onEditSubmit?.(item.id, e);
            setIsEditMode(false);
          }}
        />
      )}
    </li>
  );
}

export default ListItem;
