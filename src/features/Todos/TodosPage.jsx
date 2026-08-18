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
                const response = await fetch('/api/tasks', {
                    headers: {
                        'X-CSRF-TOKEN' : token,
                    },
                    credentials: 'include'
                });

                if (response.ok) {
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

    
    async function addTodo(todoTitle) {
        let newTodo = {
        id: Date.now(),
        title: todoTitle, 
        isCompleted: false
        };

        setTodoList((previous) => [newTodo, ...previous]);

        const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN' : token,
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ title: newTodo.title, isCompleted : newTodo.isCompleted})
        });

        if (response.ok) {
            const data = await response.json;
            setTodoList([{data, id:Date.now()} ,...setTodoList.slice(1)])
        } else {
            setTodoList(previous => previous)
            setError('Failed to add Todo')
        }
    }

    async function completeTodo(id) {
        
        setTodoList((previous) => previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo));

        try {

            const response = await fetch(`/api/tasks/${id}`,{
                method: 'PATCH',
                headers: {
                    'X-CSRF-TOKEN' : token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({isCompleted: true})
            })

            if (!response.ok) {
                throw new Error('Failed to complete Todo')
            }
        } catch {
            setTodoList(previous => previous)
        }
    }

    async function updateTodo(editedTodo) {
        const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo);

        setTodoList(updatedTodos);

        try {

            const response = await fetch(`/api/tasks/${editedTodo.id}`,{
                method: 'PATCH',
                headers: {
                    'X-CSRF-TOKEN' : token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
            })

            if (!response.ok) {
                throw new Error('Failed to complete Todo')
            }
        } catch (e) {
            setTodoList(previous => previous)
            setError(e);
        }
    }

    return (
    <div>
      { error ? (
        <>
        <p>{`${error}`}</p> 
        <button onClick={setError('')}>Clear Error</button>
        </>) : null 
      }

      { isTodoListLoading ? (<p>{`Loading...`}</p> ) : null }

      <TodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} />
    </div>
  );
}