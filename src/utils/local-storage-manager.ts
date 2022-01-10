import { ToDoList } from '../contexts/ToDoList';

const LOCALSTORAGE_KEY = 'works';

export const LocalStorageManager = {
  set: (data: Partial<ToDoList>): void => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  },
  get: (): Partial<ToDoList> => {
    const data = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY) as string,
    ) as Partial<ToDoList>;
    data?.list?.forEach(item => {
      item.createdAt = new Date(item.createdAt);
      item.expiredAt = new Date(item.expiredAt);
    });
    return data;
  },
};
