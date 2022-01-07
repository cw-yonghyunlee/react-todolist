import React from 'react';

export interface ListProps {
	list: {
		id: number;
		data: string;
	}[];
	onItemClick: (id: number) => void;
}

// eslint-disable-next-line react/prop-types
function List(props: ListProps): JSX.Element {
	const makeItems = (): JSX.Element[] =>
		props.list.map(item => (
			<li key={item.id} onClick={(): void => props.onItemClick(item.id)}>
				{item.data}
			</li>
		));
	return <ul>{makeItems()}</ul>;
}

export default List;
