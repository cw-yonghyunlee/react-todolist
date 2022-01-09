import React, { useContext, useState } from 'react';
import { ToDoListContext } from '../../contexts/ToDoList';
import TextButton from '../common/TextButton';
import LabelInput from '../common/LabelInput';

function ToDoForm(): JSX.Element {
	const toDoList = useContext(ToDoListContext);
	const [count, setCount] = useState(0);

	return (
		<form
			onSubmit={(e): void => {
				e.preventDefault();
				const formElement = e.target as HTMLFormElement;
				const form = new FormData(formElement);
				toDoList.actions.setList([
					...toDoList.list,
					{
						id: count,
						isCompleted: false,
						description: form.get('description') as string,
						createdAt: new Date(),
						expiredAt: form.get('expiredDate')
							? new Date(form.get('expiredDate') as string)
							: new Date(),
					},
				]);
				setCount(count + 1);
				formElement.reset();
			}}
		>
			<LabelInput title="내용" name="description" />
			<LabelInput title="만료일" name="expiredDate" inputType="date" />
			<TextButton title="추가" type="submit" />
		</form>
	);
}

export default ToDoForm;
