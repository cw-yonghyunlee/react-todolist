import React, { HTMLInputTypeAttribute } from 'react';

interface LabelInputProps {
	title: string;
	name: string;
	inputType?: HTMLInputTypeAttribute;
}

function LabelInput(props: LabelInputProps): JSX.Element {
	return (
		<>
			<label htmlFor={props.name}>{props.title}</label>
			<input name={props.name} type={props.inputType || 'text'} />
		</>
	);
}

export default LabelInput;
