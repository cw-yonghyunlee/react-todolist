import React from 'react';
import ListCard from './components/ListCard';
import { ToDoListProvider } from './contexts/ToDoList';

function App(): JSX.Element {
	return (
		<ToDoListProvider>
			<div className="App">
				<ListCard />
			</div>
		</ToDoListProvider>
	);
}

export default App;
