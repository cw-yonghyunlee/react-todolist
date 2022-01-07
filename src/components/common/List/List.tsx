import React from 'react';

export interface ListProps {
	list: {
		id: number;
		data: string;
	}[];
	onItemClick: (id: number) => void;
}

function List(props: ListProps): JSX.Element {
	const makeItems = (): JSX.Element[] =>
		props.list.map(item => (
			<li
				style={{
					border: '1px solid black',
				}}
				key={item.id}
				onClick={(): void => props.onItemClick(item.id)}
			>
				{item.data}
			</li>
		));
	return <ul>{makeItems()}</ul>;
}

export default List;
