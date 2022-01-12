import React from 'react';
import { ToDoListProvider } from './contexts/ToDoListContainer';
import ToDoListCard from './components/ToDoListCard/ToDoListCard';

function App(): JSX.Element {
  return (
    <ToDoListProvider>
      <h1>To Do List</h1>
      <ToDoListCard />
    </ToDoListProvider>
  );
}

export default App;
