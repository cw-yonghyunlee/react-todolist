import React, { Context, createContext, useState, useEffect } from 'react';
import { Work } from '../types/work';
import { LocalStorageManager } from '../utils/local-storage-manager';

export interface ToDoListContainer {
  list: Work[];
  currentDate: Date;
  lastId: number;
  actions: {
    setList: React.Dispatch<React.SetStateAction<Work[]>>;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
    setLastId: React.Dispatch<React.SetStateAction<number>>;
  };
}

export const ToDoListContainerContext: Context<ToDoListContainer> =
  createContext<ToDoListContainer>({
    currentDate: new Date(),
    list: [],
    lastId: 0,
    actions: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setList: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setCurrentDate: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      setLastId: () => {},
    },
  });

export const ToDoListContainerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [list, setList] = useState<Work[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [lastId, setLastId] = useState<number>(0);

  useEffect(() => {
    const data = LocalStorageManager.get();
    setList(data?.list ?? []);
    setLastId(data?.lastId ?? 0);
  }, []);

  useEffect(() => {
    LocalStorageManager.set({
      list: list,
      lastId: lastId,
    });
  }, [list, lastId]);

  const value: ToDoListContainer = {
    list,
    currentDate: date,
    lastId,
    actions: {
      setList,
      setCurrentDate: setDate,
      setLastId: setLastId,
    },
  };

  return (
    <ToDoListContainerContext.Provider value={value}>
      {children}
    </ToDoListContainerContext.Provider>
  );
};
