import { ToDoListData } from '../types/work';

const LOCALSTORAGE_KEY = 'works';

export function setLocalStorage(data: ToDoListData): void {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

export function getLocalStorage(): ToDoListData {
  const localStorageData = localStorage.getItem(LOCALSTORAGE_KEY);

  if (!localStorageData) {
    return {
      list: [],
      lastId: 0,
    };
  }

  const data: ToDoListData = JSON.parse(localStorageData);
  data?.list?.forEach(item => {
    item.createdAt = new Date(item.createdAt);
    item.expiredAt = new Date(item.expiredAt);
  });
  return data;
}
