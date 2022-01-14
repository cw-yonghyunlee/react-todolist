import React, { FormEvent, useState } from 'react';
import TextButton from '../atoms/TextButton';
import ToDoForm from './ToDoForm';
import CheckInput from '../atoms/CheckInput';

export interface ListItemInterface {
  id: number;
  title: string;
  isChecked: boolean;
  subTitle?: string;
}

interface ListProps {
  item: ListItemInterface;
  className?: string;
  onClick?: (id: number) => void;
  onChangeStatus?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEditSubmit?: (id: number, e: FormEvent<HTMLFormElement>) => void;
}

function ListItem({
  item,
  className,
  onChangeStatus,
  onEditSubmit,
  onDelete,
  onClick,
}: ListProps): JSX.Element {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <li
      key={item.id}
      onClick={(): void => onClick?.(item.id)}
      className={`${item.isChecked ? 'strikeout' : ''} ${className}`}
    >
      <div>
        {onChangeStatus && (
          <CheckInput
            className="check"
            initialValue={item.isChecked}
            onChange={(): void => {
              onChangeStatus?.(item.id);
            }}
          />
        )}
        {item.title}
        <span>만료일: {item.subTitle}</span>
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
