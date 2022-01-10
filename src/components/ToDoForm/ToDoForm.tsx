import React, { FormEvent } from 'react';
import TextButton from '../common/TextButton/TextButton';
import LabelInput from '../common/LabelInput/LabelInput';

function ToDoForm({
	submitButtonLabel,
	onSubmit,
}: {
	submitButtonLabel: string;
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}): JSX.Element {
	return (
		<form onSubmit={onSubmit}>
			<LabelInput title="내용" name="description" />
			<LabelInput title="만료일" name="expiredDate" inputType="date" />
			<TextButton title={submitButtonLabel} type="submit" />
		</form>
	);
}

export default ToDoForm;
