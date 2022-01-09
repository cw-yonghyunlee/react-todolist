import React from 'react';

export interface ListProps {
	title: string;
	list: {
		id: number;
		data: string;
	}[];
	onItemClick?: (id: number) => void;
	onItemCheckChange?: (id: number) => void;
}

function List(props: ListProps): JSX.Element {
	const makeItems = (): JSX.Element[] =>
		props.list.map(item => (
			<li
				style={{
					border: '1px solid black',
				}}
				key={item.id}
				onClick={(): void =>
					props.onItemClick ? props.onItemClick(item.id) : undefined
				}
			>
				<input
					type="checkbox"
					onChange={(): void =>
						props.onItemCheckChange
							? props.onItemCheckChange(item.id)
							: undefined
					}
				/>
				{item.data}
			</li>
		));
	return (
		<>
			<h2>{props.title}</h2>
			<ul>{makeItems()}</ul>
		</>
	);
}

export default List;
