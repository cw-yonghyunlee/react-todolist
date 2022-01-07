import React from 'react';
import { ToDoListProvider } from './contexts/ToDoList';
import ToDoListCard from './components/ToDoListCard';

function App(): JSX.Element {
	return (
		<ToDoListProvider>
			<ToDoListCard />
		</ToDoListProvider>
	);
}

export default App;
