import React, { useContext } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import List from '../common/List';
import ListCard from '../common/ListCard';
import ToDoForm from '../ToDoForm';

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
			<ToDoForm />
			<List
				title="할 일"
				list={toDoList.list
					.filter(item => !item.isCompleted)
					.filter(item => item.expiredAt.getTime() > toDoList.date.getTime())
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemCheckChange={completeWork}
			/>
			<List
				title="완료한 일"
				list={toDoList.list
					.filter(item => item.isCompleted)
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
			/>
			<List
				title="기한 만료된 일"
				list={toDoList.list
					.filter(item => item.expiredAt.getTime() < toDoList.date.getTime())
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
			/>
		</ListCard>
	);
}

export default ToDoListCard;
