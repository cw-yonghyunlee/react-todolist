import React, { useContext } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import List from '../common/List';
import ListCard from '../common/ListCard';
import AddToDoForm from '../AddToDoForm';

function ToDoListCard(): JSX.Element {
	const toDoList = useContext(ToDoListContext);

	const completeWork = (id: number): void => {
		const targetItem = toDoList.list.find(item => item.id === id);
		if (targetItem === undefined) {
			console.error('not found id');
			return;
		}
		targetItem.isCompleted = true;
		toDoList.actions.setList([...toDoList.list]);
	};

	return (
		<ListCard title="To Do List" date={new Date()}>
			<AddToDoForm />
			<List
				title="할 일"
				list={toDoList.list
					.filter(item => !item.isCompleted)
					.filter(item => item.expiredAt.getTime() > toDoList.date.getTime())
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemClick={completeWork}
			/>
			<List
				title="완료한 일"
				list={toDoList.list
					.filter(item => item.isCompleted)
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemClick={completeWork}
			/>
			<List
				title="기한 만료된 일"
				list={toDoList.list
					.filter(item => item.expiredAt.getTime() < toDoList.date.getTime())
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemClick={completeWork}
			/>
		</ListCard>
	);
}

export default ToDoListCard;