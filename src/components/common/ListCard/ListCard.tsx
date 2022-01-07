import React from 'react';

interface ListCardProps {
	title: string;
	date: Date;
	children: React.ReactNode;
}

function ListCard(props: ListCardProps): JSX.Element {
	return (
		<article>
			<h1>{props.title}</h1>
			<h3>{props.date.toLocaleDateString()}</h3>
			{props.children}
		</article>
	);
}

export default ListCard;
