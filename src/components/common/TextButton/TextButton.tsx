import React from 'react';

function TextButton({
	title,
	onClick,
}: {
	title: string;
	onClick: () => void;
}): JSX.Element {
	return <button onClick={onClick}>{title}</button>;
}

export default TextButton;
