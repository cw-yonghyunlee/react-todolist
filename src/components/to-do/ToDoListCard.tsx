import { useEffect, useState } from 'react';
import ToDoList from './ToDoList';
import Card from '../atoms/Card';
import AddToDoForm from './AddToDoForm';
import { UseFormFieldValues } from '../../types/form';
import {
  getLocalStorage,
  setLocalStorage,
} from '../../utils/local-storage-manager';
import { Work } from '../../types/work';
import { ListType } from '../../types/list';

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

  return (
    <Card>
      <h3>{currentDate.toLocaleDateString()}</h3>
      <ToDoList list={list} setList={setList} type={ListType.ACTIVE_TO_DO} />
      <ToDoList
        list={list}
        setList={setList}
        title="기한 만료된 일"
        itemClassName="expired"
        type={ListType.EXPIRED_TO_DO}
      />
      <AddToDoForm submitButtonLabel="+" onSubmit={addWork} />
    </Card>
  );
}

export default ToDoListCard;
