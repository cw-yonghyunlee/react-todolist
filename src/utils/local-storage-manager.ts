import { ToDoListContainer } from '../contexts/ToDoListContainer';

const LOCALSTORAGE_KEY = 'works';

export const LocalStorageManager = {
  set: (data: Partial<ToDoListContainer>): void => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  },
  get: (): Partial<ToDoListContainer> => {
    const data = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY) as string,
    ) as Partial<ToDoListContainer>;
    data?.list?.forEach(item => {
      item.createdAt = new Date(item.createdAt);
      item.expiredAt = new Date(item.expiredAt);
    });
    return data;
  },
};
