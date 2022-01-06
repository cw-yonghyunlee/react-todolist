import React, { Context, createContext, useState } from 'react';
import { Work } from '../types';

interface ToDoList {
	list: Work[];
	date: Date;
	actions: {
		setList: React.Dispatch<React.SetStateAction<Work[]>>;
		setDate: React.Dispatch<React.SetStateAction<Date>>;
	};
}

export const ToDoListContext: Context<ToDoList> = createContext<ToDoList>({
	date: new Date(),
	list: [],
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setList: () => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		setDate: () => {},
	},
});

export const ToDoListProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [list, setList] = useState<Work[]>([]);
	const [date, setDate] = useState<Date>(new Date());

	const value: ToDoList = {
		list,
		date,
		actions: {
			setList: setList,
			setDate: setDate,
		},
	};

	return (
		<ToDoListContext.Provider value={value}>
			{children}
		</ToDoListContext.Provider>
	);
};
