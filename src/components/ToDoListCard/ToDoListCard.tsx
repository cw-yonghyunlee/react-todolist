import React, { useContext, useState } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import List from '../common/List';
import ListCard from '../common/ListCard';
import TextButton from '../common/TextButton';

function ToDoListCard(): JSX.Element {
	const toDoList = useContext(ToDoListContext);
	const [count, setCount] = useState(0);

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
			<TextButton
				title="추가"
				onClick={(): void => {
					toDoList.actions.setList([
						...toDoList.list,
						{
							id: count,
							isCompleted: false,
							description: 'to do',
						},
					]);
					setCount(count + 1);
				}}
			/>
			<List
				title="할 일"
				list={toDoList.list
					.filter(item => !item.isCompleted)
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
		</ListCard>
	);
}

export default ToDoListCard;
