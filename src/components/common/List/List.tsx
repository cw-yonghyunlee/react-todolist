import React from 'react';
import TextButton from '../TextButton';

export interface ListProps {
	title: string;
	list: {
		id: number;
		data: string;
	}[];
	onItemClick?: (id: number) => void;
	onItemCheckChange?: (id: number) => void;
	onItemDelete?: (id: number) => void;
}

function List(props: ListProps): JSX.Element {
	const makeItems = (): JSX.Element[] => {
		return props.list.map(item => (
			<li
				style={{
					border: '1px solid black',
				}}
				key={item.id}
				onClick={(): void => props.onItemClick?.(item.id)}
			>
				{props.onItemCheckChange && (
					<input
						type="checkbox"
						onChange={(): void => props.onItemCheckChange?.(item.id)}
					/>
				)}
				{item.data}
				{props.onItemDelete ? (
					<TextButton
						title="삭제"
						onClick={(): void => props.onItemDelete?.(item.id)}
					/>
				) : null}
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
