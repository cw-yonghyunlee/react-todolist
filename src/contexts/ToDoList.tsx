import React, { Context, createContext, useState, useEffect } from 'react';
import { Work } from '../types';
import { LocalStorageManager } from '../utils/local-storage-manager';

export interface ToDoList {
	list: Work[];
	date: Date;
	lastId: number;
	actions: {
		setList: React.Dispatch<React.SetStateAction<Work[]>>;
		setDate: React.Dispatch<React.SetStateAction<Date>>;
		setLastId: React.Dispatch<React.SetStateAction<number>>;
	};
}

export const ToDoListContext: Context<ToDoList> = createContext<ToDoList>({
	date: new Date(),
	list: [],
	lastId: 0,
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setList: () => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setDate: () => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setLastId: () => {},
	},
});

export const ToDoListProvider = ({
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

	const value: ToDoList = {
		list,
		date,
		lastId,
		actions: {
			setList: setList,
			setDate: setDate,
			setLastId: setLastId,
		},
	};

	return (
		<ToDoListContext.Provider value={value}>
			{children}
		</ToDoListContext.Provider>
	);
};
