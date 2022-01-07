import React, { useContext, useState } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import TextButton from '../common/TextButton';
import LabelInput from '../common/DateInput';

function AddToDoForm(): JSX.Element {
	const toDoList = useContext(ToDoListContext);
	const [count, setCount] = useState(0);

	return (
		<form
			onSubmit={(e): void => {
				e.preventDefault();
				const form = new FormData(e.target as HTMLFormElement);
				toDoList.actions.setList([
					...toDoList.list,
					{
						id: count,
						isCompleted: false,
						description: form.get('description') as string,
						createdAt: new Date(),
						expiredAt: new Date(form.get('expiredDate') as string),
					},
				]);
				setCount(count + 1);
			}}
		>
			<LabelInput title="내용" name="description" />
			<LabelInput title="만료일" name="expiredDate" inputType="date" />
			<TextButton title="추가" type="submit" />
		</form>
	);
}

export default AddToDoForm;
