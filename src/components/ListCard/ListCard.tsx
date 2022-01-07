import React, { useContext } from 'react';
import List from '../List';
import { ToDoListContext } from '../../contexts/ToDoList';

function ListCard(): JSX.Element {
	const toDoList = useContext(ToDoListContext);

	return (
		<article>
			<h1>To Do List</h1>
			<List
				list={toDoList.list.map(item => ({
					id: item.id,
					data: item.description,
				}))}
				onItemClick={(id: number): void => console.log(id)}
			/>
		</article>
	);
}

export default ListCard;
