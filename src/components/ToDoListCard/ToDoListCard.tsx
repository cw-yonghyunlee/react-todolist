import React, { useContext } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import List from '../common/List';
import ListCard from '../common/ListCard';

function ToDoListCard(): JSX.Element {
	const toDoList = useContext(ToDoListContext);

	const completeWork = (id: number): void => {
		const filteredList = toDoList.list.filter(item => item.id === id);
		toDoList.actions.setList(filteredList);
	};

	return (
		<ListCard title="To Do List" date={new Date()}>
			<List
				list={toDoList.list.map(item => ({
					id: item.id,
					data: item.description,
				}))}
				onItemClick={completeWork}
			/>
		</ListCard>
	);
}

export default ToDoListCard;
