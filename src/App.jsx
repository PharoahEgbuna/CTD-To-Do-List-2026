import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import './App.css'
import {useState} from 'react';

const todos = [
        {id: 1, title: 'review resources'},
        {id: 2, title: 'take notes'},
        {id: 3, title: 'code out the app'},
    ];
  
function App() {

  const [todoList, setTodoList] = useState(todos);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App
