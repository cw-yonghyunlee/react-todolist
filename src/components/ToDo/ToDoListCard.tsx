import React, { useContext } from 'react';
import { ToDoListContainerContext } from '../../contexts/ToDoListContainer';
import List from '../List/List';
import Card from '../atoms/Card';
import AddToDoForm from './AddToDoForm';
import { UseFormFieldValues } from '../../types/form';

function ToDoListCard(): JSX.Element {
  const toDoList = useContext(ToDoListContainerContext);

  const changeWorkStatus = (id: number): void => {
    const targetItem = toDoList.list.find(item => item.id === id);
    if (!targetItem) {
      console.error('not found id');
      return;
    }
    targetItem.isCompleted = !targetItem.isCompleted;
    toDoList.actions.setList([...toDoList.list]);
  };

  const deleteWork = (id: number): void => {
    toDoList.actions.setList(toDoList.list.filter(item => item.id !== id));
  };

  const addWork = (values: UseFormFieldValues): void => {
    const newData = [
      ...toDoList.list,
      {
        id: toDoList.lastId + 1,
        isCompleted: false,
        description: values['description']!,
        createdAt: new Date(),
        expiredAt: new Date(values['expiredDate']!),
      },
    ];
    toDoList.actions.setList(newData);
    toDoList.actions.setLastId(toDoList.lastId + 1);
  };

  const editWork = (id: number, values: UseFormFieldValues): void => {
    const targetItem = toDoList.list.find(item => item.id === id);
    if (!targetItem) {
      console.error('not found id');
      return;
    }

    targetItem.description = values['description']!;
    targetItem.expiredAt = new Date(values['expiredDate']!);
    toDoList.actions.setList([...toDoList.list]);
  };

  return (
    <Card>
      <h3>{new Date().toLocaleDateString()}</h3>
      <List
        list={toDoList.list
          .filter(
            item => item.expiredAt.getTime() > toDoList.currentDate.getTime(),
          )
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
        list={toDoList.list
          .filter(
            item => item.expiredAt.getTime() < toDoList.currentDate.getTime(),
          )
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
