import React from 'react';
import Card from './components/Card';
import { ToDoListProvider } from './contexts/ToDoList';

function App(): JSX.Element {
	return (
		<ToDoListProvider>
			<div className="App">
				<Card />
			</div>
		</ToDoListProvider>
	);
}

export default App;
