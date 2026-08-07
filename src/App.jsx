import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import './App.css'
import {useState} from 'react';
  
function App() {

  const [todoList, setTodoList] = useState([]);

  function addTodo(todoTitle) {
    let newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false
    };

    setTodoList((previous) => [newTodo, ...previous]);
  }

  function completeTodo(id) {
    setTodoList((previous) => previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo));
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} />
    </div>
  );
}

export default App
