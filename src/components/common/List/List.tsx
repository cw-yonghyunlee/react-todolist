import React, { FormEvent } from 'react';
import ListItem, { ListItemInterface } from '../ListItem/ListItem';

export interface ListProps {
	title: string;
	list: ListItemInterface[];
	onItemClick?: (id: number) => void;
	onItemCheckChange?: (id: number) => void;
	onItemDelete?: (id: number) => void;
	onItemEditSubmit?: (id: number, e: FormEvent<HTMLFormElement>) => void;
}

function List({
	title,
	list,
	onItemClick,
	onItemEditSubmit,
	onItemCheckChange,
	onItemDelete,
}: ListProps): JSX.Element {
	const makeItems = (): JSX.Element[] => {
		return list.map(item => (
			<ListItem
				key={item.id}
				item={item}
				onClick={onItemClick}
				onCheckChange={onItemCheckChange}
				onDelete={onItemDelete}
				onEditSubmit={onItemEditSubmit}
			/>
		));
	};
	return (
		<>
			<h2>{title}</h2>
			<ul>{makeItems()}</ul>
		</>
	);
}

export default List;
