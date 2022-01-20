import { useState } from 'react';
import Button from '../atoms/Button';
import ToDoForm from '../to-do/ToDoForm';
import CheckBox from '../atoms/CheckBox';
import { UseFormFieldValues } from '../../types/form';
import { ListItemInterface, ListType } from '../../types/list';

interface ListProps {
  item: ListItemInterface;
  mode: ListType;
  className?: string;
  onClick?: (id: number) => void;
  onChangeStatus?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEditSubmit?: (id: number, formData: UseFormFieldValues) => void;
}

function ListItem(props: ListProps): JSX.Element {
  const {
    item,
    mode,
    className,
    onChangeStatus,
    onEditSubmit,
    onDelete,
    onClick,
  } = props;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <li
      key={item.id}
      onClick={(): void => onClick?.(item.id)}
      className={`${item.isChecked ? 'strikeout' : ''} ${className}`}
    >
      <div>
        {mode === ListType.ACTIVATE_TO_DO && (
          <CheckBox
            initialValue={item.isChecked}
            onChange={(): void => {
              onChangeStatus?.(item.id);
            }}
          />
        )}
        {item.title}
        <span>만료일: {item.subTitle}</span>
        {mode === ListType.ACTIVATE_TO_DO && (
          <Button
            className="edit"
            onClick={(): void => setIsEditMode(!isEditMode)}
          >
            편집
          </Button>
        )}
        <Button className="delete" onClick={(): void => onDelete?.(item.id)}>
          삭제
        </Button>
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
