import TodoForm from './TodoForm.jsx' 
import TodoList from './TodoList/TodoList.jsx';
import {useState, useEffect} from 'react';

// export default function TodosPage({ token }) {
//     const [todoList, setTodoList] = useState([]);
//     const [error, setError] = useState('');
//     const [isTodoListLoading, setIsTodoListLoading] = useState(false);

//     useEffect(() => {
//         async function fetchTodos() {
//             try {
//                 setIsTodoListLoading(true);
//                 const response = await fetch('/api/tasks?limit=100', {
//                     headers: {
//                         'X-CSRF-TOKEN' : token,
//                     },
//                     credentials: 'include'
//                 });

//                 if (response.ok) {
//                     const data = await response.json()
//                     setTodoList([...data])
//                 } else if (response.status === 401) {
//                     throw new Error('Unauthorized')
//                 } else {
//                     throw new Error('Something went wrong.')
//                 }
//             } catch (e) {
//                 setError(e)
//             } finally {
//                 setIsTodoListLoading(false);
//             }
//         }

//         if (token) { fetchTodos() }
//     }, [token])

    
//     async function addTodo(todoTitle) {
//         let newTodo = {
//         id: Date.now(),
//         title: todoTitle, 
//         isCompleted: false
//         };

//         setTodoList((previous) => [newTodo, ...previous]);

//         try {
//             const response = await fetch('/api/tasks', {
//                     method: 'POST',
//                     headers: {
//                         'X-CSRF-TOKEN' : token,
//                         'Content-Type': 'application/json'
//                     },
//                     credentials: 'include',
//                     body: JSON.stringify({ title: newTodo.title, isCompleted: newTodo.isCompleted})
//              });
            
//             if (response.ok) {
//                 const data = await response.json();
//                 setTodoList(previous => [data, ...previous])
//             } else {
//                 throw new Error('Failed to add todo')
//             }
//         } catch (e) {
//             setTodoList(todoList);
//             setError(e);
//         }
//     }

//     async function completeTodo(id) {
//         const rollbackTodo = todoList.filter(todo => todo.id === id);

//         setTodoList((previous) => previous.map(todo => todo.id === rollbackTodo.id 
//             ? {...todo, isCompleted: true} : todo
//         ));

//         try {
//             const response = await fetch(`/api/tasks/${id}`, {
//             method: 'PATCH',
//             headers: {
//                 'X-CSRF-TOKEN' : token,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({isCompleted: true})
//             })

//             if (!response.ok) {
//                 throw new Error('Failed to complete Todo')
//             }
//         } catch(e) {
//             setTodoList(todoList)
//             setError(e)
//         }
//     }

//     async function updateTodo(editedTodo) {
//         const updatedTodo = editedTodo;
//         const updatedTodoList = todoList.map(todo => todo.id === updatedTodo.id ? {...updatedTodo} : todo);
//         setTodoList(updatedTodoList);

//         try {
//             const response = await fetch(`/api/tasks/${editedTodo.id}`,{
//                 method: 'PATCH',
//                 headers: {
//                     'X-CSRF-TOKEN' : token,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({title: updatedTodo.title, isCompleted: updatedTodo.isCompleted})
//             })

//             if (!response.ok) {
//                 throw new Error('Failed to complete Todo')
//             }
//         } catch (e) {
//             setTodoList(todoList)
//             setError(e);
//         }
//     }

//     return (
//     <div>
//       { error ? (
//         <div>
//         <p>{`${error}`}</p> 
//         <button onClick={setError('')}>Clear Error</button>
//         </div>) : null 
//       }

//       { isTodoListLoading ? (<p>{`Loading...`}</p> ) : null }

//       <TodoForm onAddTodo={addTodo} />

//       <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} />
//     </div>
//   );
// }

export default function TodosPage({token}) {
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState('')
    const [isTodoListLoading, setIsTodoListLoading] = useState(false)

    useEffect(() => {
        async function fetchTodos() {
            try {
                setIsTodoListLoading(true)

                const response = await fetch('/api/tasks', {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                })

                if (response.ok) {
                    const data = await response.json();
                    setTodoList([...data])
                } else if (response.status === 401) {
                    throw new Error('Unauthorized error')
                } else {
                    throw new Error('Generic error')
                }
            } catch (e) {
                setError(e);
            } finally {
                setIsTodoListLoading(false);
            }
        }

        if (token) {
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
                setTodoList([data, ...todoList]);
            } else {
                throw new Error('failed to add todo')
            }
        } catch(e) {
            setTodoList(todoList);
            setError(e);
        }
    }

    async function completeTodo(id) {
        const rollbackTodo = todoList.filter(todo => todo.id === id);

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
                throw new Error('Failed to complete todo')
            
            }
        } catch(e) {
            setTodoList((previous) => previous.map(todo => todo.id === id ? {...rollbackTodo} : todo));
            setError(e);    
        }
    }

    async function updateTodo(editedTodo) {
        const rollbackTodo = editedTodo;
        const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo);
        setTodoList(updatedTodos);

        try {
            const response = await fetch(`/api/tasks/${editedTodo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                },
                body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
            })

            if (!response.ok) {
                throw new Error('Failed to update todo')
            }
        } catch(e) {
            setTodoList(todoList.map(todo => todo.id === editedTodo.id ? {...rollbackTodo} : todo));
            setError(e);
        }
        
    }

    return (
    <div>
      { error ? (
        <div>
        <p>{`${error}`}</p> 
        <button onClick={setError('')}>Clear Error</button>
        </div>) : null 
      }

      { isTodoListLoading ? (<p>{`Loading...`}</p> ) : null }

      <TodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} />
    </div>
    );
}