import TodoForm from './TodoForm.jsx' 
import TodoList from './TodoList/TodoList.jsx';
import {useState, useEffect} from 'react';

export default function TodosPage({token}) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState('')
    const [isTodoListLoading, setIsTodoListLoading] = useState(false)


    function handleError() {
        setError('');
    }

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsTodoListLoading(true)

                const response = await fetch('/api/tasks?limit=100', {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                })

                if (response.ok) {
                    const data = await response.json();
                    setTodoList([...data.tasks])
                } else if (response.status === 401) {
                    throw new Error('unauthorized')
                } else {
                    throw new Error('Generic error')
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setIsTodoListLoading(false);
            }
        }

        if (token.trim()) {
            fetchTodos();
        }
    }, [token])


    async function addTodo(todoTitle) {
        let newTodo = {
        id: Date.now(),
        title: todoTitle, 
        isCompleted: false
        };

        setTodoList((previous) => [newTodo, ...previous]);

        try {
            const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
            },
            credentials: 'include',
            body: JSON.stringify({title: newTodo.title, isCompleted: newTodo.isCompleted})
            })

            if (response.ok) {
                const data = await response.json();
                setTodoList(prev => prev.map(todo => todo.id === newTodo.id ? data : todo))
            } else {
                setTodoList(prev => prev.filter(todo => todo.id !== newTodo.id));
                throw new Error('Failed to add todo');
            }
        } catch(e) {
            setError(e.message);
        }
    }

    async function completeTodo(id) {
        let rollback = todoList.find(todo => todo.id == id);

        setTodoList((previous) => previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo));

        try {
            
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({isCompleted: true})
            });

            if (!response.ok) {
                setTodoList((previous) => previous.map(todo => todo.id === id ? {...rollback} : todo));
                throw new Error('Failed to complete todo.');
            }
        } catch(e) {
            setError(e.message);    
        }
    }

    async function updateTodo(editedTodo) {
        let rollback = todoList.find(todo => todo.id === editedTodo.id);

        const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo);
        
        setTodoList(updatedTodos);

        try {
            const response = await fetch(`/api/tasks/${editedTodo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                credentials: 'include',
                body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
            })

            if (!response.ok) {
                throw new Error('Failed to update todo.');
            }
        } catch(e) {
            setTodoList(todoList.map(todo => todo.id === editedTodo.id ? {...rollback} : todo));
            setError(e.message);
        }
        
    }

    return (
    <div>
      { error ? (
        <div>
        <p>{`${error}`}</p> 
        <button onClick={handleError}>Clear Error</button>
        </div>) : null 
      }

      { isTodoListLoading ? (<p>{`Loading...`}</p> ) : null }

      <TodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} />
    </div>
    );
}