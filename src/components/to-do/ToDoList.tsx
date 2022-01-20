import ListItem from '../list/ListItem';
import { Dispatch, SetStateAction } from 'react';
import { Work } from '../../types/work';
import { UseFormFieldValues } from '../../types/form';
import { ListType } from '../../types/list';

interface ListProps {
  list: Work[];
  setList: Dispatch<SetStateAction<Work[]>>;
  type: ListType;
  title?: string;
  itemClassName?: string;
}

function ToDoList({
  list,
  setList,
  type,
  title,
  itemClassName,
}: ListProps): JSX.Element {
  const changeWorkStatus = (id: number): void => {
    const targetItem = list.find(item => item.id === id);
    if (!targetItem) {
      console.error('not found id');
      return;
    }
    targetItem.isCompleted = !targetItem.isCompleted;
    setList([...list]);
  };

  const deleteWork = (id: number): void => {
    setList(list.filter(item => item.id !== id));
  };

  const editWork = (id: number, formData: UseFormFieldValues): void => {
    const targetItem = list.find(item => item.id === id);
    if (!targetItem) {
      console.error('not found id');
      return;
    }
    targetItem.description = formData['description']!;
    targetItem.expiredAt = new Date(formData['expiredDate']!);
    setList([...list]);
  };

  const makeItems = (listType: ListType): JSX.Element[] => {
    const currentDate = new Date();
    let filter;
    if (listType === ListType.EXPIRED_TO_DO) {
      filter = (item: Work): boolean =>
        item.expiredAt.getTime() < currentDate.getTime();
    } else {
      filter = (item: Work): boolean =>
        item.expiredAt.getTime() > currentDate.getTime();
    }
    return list.filter(filter).map(item => (
      <ListItem
        key={item.id}
        item={{
          id: item.id,
          title: item.description,
          isChecked: item.isCompleted,
          subTitle: item.expiredAt.toLocaleDateString(),
        }}
        className={itemClassName}
        onChangeStatus={
          type === ListType.ACTIVE_TO_DO ? changeWorkStatus : undefined
        }
        onDelete={deleteWork}
        onEditSubmit={type === ListType.ACTIVE_TO_DO ? editWork : undefined}
      />
    ));
  };
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul>{makeItems(type)}</ul>
    </>
  );
}

export default ToDoList;
