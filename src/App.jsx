import TodoForm from '/src/features/TodoForm.jsx' 
import TodoList from '/src/features/TodoList/TodoList.jsx';
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

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo);
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} />
    </div>
  );
}

export default App
