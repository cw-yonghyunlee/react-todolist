import React from 'react';
import ListCard from './components/common/ListCard';
import { ToDoListProvider } from './contexts/ToDoList';

function App(): JSX.Element {
	return (
		<ToDoListProvider>
			<ListCard />
		</ToDoListProvider>
	);
}

export default App;
