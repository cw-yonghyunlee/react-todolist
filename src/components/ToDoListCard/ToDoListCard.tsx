import React, { FormEvent, useContext } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import List from '../common/List/List';
import ListCard from '../common/ListCard/ListCard';
import AddToDoForm from '../AddToDoForm/AddToDoForm';

function ToDoListCard(): JSX.Element {
  const toDoList = useContext(ToDoListContext);

  const changeWorkStatus = (id: number): void => {
    console.log('gd');
    const targetItem = toDoList.list.find(item => item.id === id);
    if (targetItem === undefined) {
      console.error('not found id');
      return;
    }
    targetItem.isCompleted = !targetItem.isCompleted;
    toDoList.actions.setList([...toDoList.list]);
  };

  const deleteWork = (id: number): void => {
    toDoList.actions.setList(toDoList.list.filter(item => item.id !== id));
  };

  const addWork = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const form = new FormData(formElement);
    const newData = [
      ...toDoList.list,
      {
        id: toDoList.lastId + 1,
        isCompleted: false,
        description: form.get('description') as string,
        createdAt: new Date(),
        expiredAt: form.get('expiredDate')
          ? new Date(form.get('expiredDate') as string)
          : new Date(),
      },
    ];
    toDoList.actions.setList(newData);
    toDoList.actions.setLastId(toDoList.lastId + 1);
    formElement.reset();
  };

  const editWork = (id: number, e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const targetItem = toDoList.list.find(item => item.id === id);
    if (targetItem === undefined) {
      console.error('not found id');
      return;
    }

    const formElement = e.target as HTMLFormElement;
    const form = new FormData(formElement);
    targetItem.description = form.get('description') as string;
    targetItem.expiredAt = new Date(form.get('expiredDate') as string);
    toDoList.actions.setList([...toDoList.list]);
    formElement.reset();
  };

  return (
    <ListCard date={new Date()}>
      <List
        list={toDoList.list
          .filter(item => item.expiredAt.getTime() > toDoList.date.getTime())
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
        list={toDoList.list
          .filter(item => item.expiredAt.getTime() < toDoList.date.getTime())
          .map(item => ({
            id: item.id,
            title: item.description,
            isChecked: item.isCompleted,
            subTitle: item.expiredAt.toLocaleDateString(),
          }))}
        onItemDelete={deleteWork}
      />
      <AddToDoForm submitButtonLabel="추가" onSubmit={addWork} />
    </ListCard>
  );
}

export default ToDoListCard;
