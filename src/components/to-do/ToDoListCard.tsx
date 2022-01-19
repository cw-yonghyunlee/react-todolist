import React, { useEffect, useState } from 'react';
import List from '../list/List';
import Card from '../atoms/Card';
import AddToDoForm from './AddToDoForm';
import { UseFormFieldValues } from '../../types/form';
import {
  getLocalStorage,
  setLocalStorage,
} from '../../utils/local-storage-manager';
import { Work } from '../../types/work';

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

  const addWork = (values: UseFormFieldValues): void => {
    const newData = [
      ...list,
      {
        id: lastId + 1,
        isCompleted: false,
        description: values['description']!,
        createdAt: new Date(),
        expiredAt: new Date(values['expiredDate']!),
      },
    ];
    setList(newData);
    setLastId(lastId + 1);
  };

  const editWork = (id: number, values: UseFormFieldValues): void => {
    const targetItem = list.find(item => item.id === id);
    if (!targetItem) {
      console.error('not found id');
      return;
    }
    targetItem.description = values['description']!;
    targetItem.expiredAt = new Date(values['expiredDate']!);
    setList([...list]);
  };

  return (
    <Card>
      <h3>{currentDate.toLocaleDateString()}</h3>
      <List
        list={list
          .filter(item => item.expiredAt.getTime() > currentDate.getTime())
          .map(item => ({
            id: item.id,
            title: item.description,
            isChecked: item.isCompleted,
            subTitle: item.expiredAt.toLocaleDateString(),
          }))}
        onItemComplete={changeWorkStatus}
        onItemDelete={deleteWork}
        onItemEditSubmit={editWork}
      />
      <List
        title="기한 만료된 일"
        itemClassName="expired"
        list={list
          .filter(item => item.expiredAt.getTime() < currentDate.getTime())
          .map(item => ({
            id: item.id,
            title: item.description,
            isChecked: item.isCompleted,
            subTitle: item.expiredAt.toLocaleDateString(),
          }))}
        onItemDelete={deleteWork}
      />
      <AddToDoForm submitButtonLabel="+" onSubmit={addWork} />
    </Card>
  );
}

export default ToDoListCard;
