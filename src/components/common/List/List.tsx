import React, { FormEvent, useState } from 'react';
import TextButton from '../TextButton/TextButton';
import ToDoForm from '../../ToDoForm/ToDoForm';

export interface ListProps {
	title: string;
	list: {
		id: number;
		data: string;
	}[];
	onItemClick?: (id: number) => void;
	onItemCheckChange?: (id: number) => void;
	onItemDelete?: (id: number) => void;
	onItemEditSubmit?: (id: number, e: FormEvent<HTMLFormElement>) => void;
}

function List(props: ListProps): JSX.Element {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const makeItems = (): JSX.Element[] => {
		return props.list.map(item => (
			<li
				style={{
					border: '1px solid black',
				}}
				key={item.id}
				onClick={(): void => props.onItemClick?.(item.id)}
				onDoubleClick={(): void => setIsEditMode(!isEditMode)}
			>
				{props.onItemCheckChange && (
					<input
						type="checkbox"
						onChange={(): void => props.onItemCheckChange?.(item.id)}
					/>
				)}
				{item.data}
				{props.onItemDelete && (
					<TextButton
						title="삭제"
						onClick={(): void => props.onItemDelete?.(item.id)}
					/>
				)}
				{isEditMode && (
					<ToDoForm
						submitButtonLabel="편집"
						onSubmit={(e): void => {
							props.onItemEditSubmit?.(item.id, e);
							setIsEditMode(false);
						}}
					/>
				)}
			</li>
		));
	};
	return (
		<>
			<h2>{props.title}</h2>
			<ul>{makeItems()}</ul>
		</>
	);
}

export default List;
