import TodoForm from './TodoForm.jsx' 
import TodoList from './TodoList/TodoList.jsx';
import {useState, useEffect} from 'react';

export default function TodosPage({ token }) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState('');
    const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsTodoListLoading(true);
                const response = await fetch('api/tasks', 
                    { headers: {
                        'X-CSRF-TOKEN' : token,
                    },
                    credentials: 'include',
                });

                if (response.status === 200) {
                    const data = response.json()
                    setTodoList(data)
                } else if (response.status === 401) {
                    throw new Error('Unauthorized')
                } else if (!response.ok) {
                    throw new Error('Something went wrong.')

                }
            } catch (appError) {
                setError(appError)
            } finally {
                setIsTodoListLoading(false);
            }
        }

        if (token) {
            fetchTodos()
        }
    }, [token])

    
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
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} />
    </div>
  );
}