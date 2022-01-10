import React, { FormEvent, useContext } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import List from '../common/List/List';
import ListCard from '../common/ListCard/ListCard';
import ToDoForm from '../ToDoForm/ToDoForm';

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

	const deleteWork = (id: number): void => {
		toDoList.actions.setList(toDoList.list.filter(item => item.id !== id));
	};

	const addWork = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const formElement = e.target as HTMLFormElement;
		const form = new FormData(formElement);
		const newData = [
			...toDoList.list,
			{
				id: toDoList.lastId + 1,
				isCompleted: false,
				description: form.get('description') as string,
				createdAt: new Date(),
				expiredAt: form.get('expiredDate')
					? new Date(form.get('expiredDate') as string)
					: new Date(),
			},
		];
		toDoList.actions.setList(newData);
		toDoList.actions.setLastId(toDoList.lastId + 1);
		formElement.reset();
	};

	const editWork = (id: number, e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const targetItem = toDoList.list.find(item => item.id === id);
		if (targetItem === undefined) {
			console.error('not found id');
			return;
		}

		const formElement = e.target as HTMLFormElement;
		const form = new FormData(formElement);
		targetItem.description = form.get('description') as string;
		targetItem.expiredAt = new Date(form.get('expiredDate') as string);
		toDoList.actions.setList([...toDoList.list]);
		formElement.reset();
	};

	return (
		<ListCard title="To Do List" date={new Date()}>
			<ToDoForm submitButtonLabel="추가" onSubmit={addWork} />
			<List
				title="할 일"
				list={toDoList.list
					.filter(item => !item.isCompleted)
					.filter(item => item.expiredAt.getTime() > toDoList.date.getTime())
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemComplete={completeWork}
				onItemDelete={deleteWork}
				onItemEditSubmit={editWork}
			/>
			<List
				title="완료한 일"
				list={toDoList.list
					.filter(item => item.isCompleted)
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemDelete={deleteWork}
			/>
			<List
				title="기한 만료된 일"
				list={toDoList.list
					.filter(item => item.expiredAt.getTime() < toDoList.date.getTime())
					.map(item => ({
						id: item.id,
						data: item.description,
					}))}
				onItemDelete={deleteWork}
			/>
		</ListCard>
	);
}

export default ToDoListCard;
