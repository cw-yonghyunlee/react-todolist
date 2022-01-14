import React from 'react';
import { ToDoListContainerProvider } from './contexts/ToDoListContainer';
import ToDoListCard from './components/ToDo/ToDoListCard';

function App(): JSX.Element {
  return (
    <ToDoListContainerProvider>
      <h1>To Do List</h1>
      <ToDoListCard />
    </ToDoListContainerProvider>
  );
}

export default App;
