import { useEffect, useState } from 'react';
import List from '../list/List';
import Card from '../atoms/Card';
import AddToDoForm from './AddToDoForm';
import { UseFormFieldValues } from '../../types/form';
import {
  getLocalStorage,
  setLocalStorage,
} from '../../utils/local-storage-manager';
import { Work } from '../../types/work';
import { ListItemInterface, ListType } from '../../types/list';

const currentDate = new Date();

function ToDoListCard(): JSX.Element {
  const [list, setList] = useState<Work[]>(getLocalStorage().list);
  const [lastId, setLastId] = useState<number>(getLocalStorage().lastId);

  useEffect(() => {
    setLocalStorage({
      list,
      lastId,
    });
  }, [list, lastId]);

  const makeFilteredList = (type: ListType): ListItemInterface[] => {
    return list
      .filter(item =>
        type === ListType.ACTIVATE_TO_DO
          ? item.expiredAt.getTime() > currentDate.getTime()
          : item.expiredAt.getTime() <= currentDate.getTime(),
      )
      .map(item => ({
        id: item.id,
        title: item.description,
        isChecked: item.isCompleted,
        subTitle: item.expiredAt.toLocaleDateString(),
      }));
  };

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

  const addWork = (formData: UseFormFieldValues): void => {
    const newData = [
      ...list,
      {
        id: lastId + 1,
        isCompleted: false,
        description: formData['description']!,
        createdAt: new Date(),
        expiredAt: new Date(formData['expiredDate']!),
      },
    ];
    setList(newData);
    setLastId(lastId + 1);
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

  return (
    <Card>
      <h3>{currentDate.toLocaleDateString()}</h3>
      <List
        list={makeFilteredList(ListType.ACTIVATE_TO_DO)}
        mode={ListType.ACTIVATE_TO_DO}
        onItemComplete={changeWorkStatus}
        onItemDelete={deleteWork}
        onItemEditSubmit={editWork}
      />
      <List
        list={makeFilteredList(ListType.EXPIRED_TO_DO)}
        title="기한 만료된 일"
        itemClassName="expired"
        mode={ListType.EXPIRED_TO_DO}
        onItemDelete={deleteWork}
      />
      <AddToDoForm submitButtonLabel="+" onSubmit={addWork} />
    </Card>
  );
}

export default ToDoListCard;
