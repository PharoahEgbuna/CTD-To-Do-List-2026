import TodoForm from './TodoForm.jsx' 
import TodoList from './TodoList/TodoList.jsx';
import SortBy from '../../shared/SortBy.jsx';
import useDebounce from '../../utils/useDebounce.js';
import FilterInput from '../../shared/FilterInput.jsx';
import {todoReducer, initialTodoState, TODO_ACTIONS} from '../../reducers/todoReducer.js';
import {useState, useEffect, useCallback, useReducer} from 'react';


export default function TodosPage({token}) {
    // const [todoList, setTodoList] = useState([]);
    // const [error, setError] = useState('');
    // const [isTodoListLoading, setIsTodoListLoading] = useState(false);
    // const [sortBy, setSortBy] = useState('createdAt');
    // const [sortDirection, setSortDirection] = useState('desc');
    // const [filterTerm, setFilterTerm] = useState('');
    // const [filterError, setFilterError] = useState('');
    // const [dataVersion, setDataVersion] = useState(0);

    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const {
        todoList, 
        isTodoListLoading,
        sortBy,
        sortDirection,
        error, 
        filterError,
        filterTerm,
        dataVersion,
    } = state;

    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    const invalidateCache = useCallback(() => {
        // setDataVersion(prev => prev + 1);
        dispatch(
            { 
                type: TODO_ACTIONS.SET_DATA_VERSION,
                payload: {
                    newDataVerison: dataVersion + 1
                }
            }
        )
    }, [dataVersion]);

    const handleFilterChange = ((newTerm) =>
        //{setFilterTerm(newTerm);
        dispatch(
            { 
                type: TODO_ACTIONS.SET_FILTER,
                payload: {
                    filter: newTerm
                }
            }
        )
     );

    useEffect(() => {
        async function fetchTodos() {
            // setIsTodoListLoading(true)
            dispatch({ type: TODO_ACTIONS.FETCH_START });
            console.log('Fetch Start');
            
            try {

                const paramsObject  ={
                    sortBy,
                    sortDirection,
                    limit: 100
                };

                if (debouncedFilterTerm) { 
                    paramsObject.find = debouncedFilterTerm;
                }

                const params = new URLSearchParams(paramsObject);

                const response = await fetch(`/api/tasks?${params}`, {
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                })
                
                if (response.ok) {
                    const data = await response.json();
                    
                    dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, 
                        payload: { todos: data.tasks } }
                    );
                    console.log('Fetch Success');
                    // setTodoList([...data.tasks])    
                    // setFilterError('');
                } else if (response.status === 401) {
                    throw new Error(`Unauthorized ${response.statusText}`)
                } else {
                    throw new Error('An error other than unauthorized occured.')
                }
            } catch (error) {
                if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
                    // setFilterError(`Error filtering/sorting todos: ${error.message}`);
                    dispatch({
                        type: TODO_ACTIONS.FETCH_ERROR,
                        payload: {
                            message: `Error filtering/sorting todos: ${error.message}`,
                            isFilterError: true
                        }
                    }) 
                } else {
                    // setError(`Error fetching todos: ${error.message}`);
                    dispatch({
                        type: TODO_ACTIONS.FETCH_ERROR,
                        payload: {
                            message: `Error fetching todos: ${error.message}`,
                            isFilterError: false
                        }
                    })   
                    console.log('Fetch Error');                
                }
            // } finally {
            //     setIsTodoListLoading(false);
            }
        }

        if (token) {
            fetchTodos();
        }
    }, [token, sortBy, sortDirection, debouncedFilterTerm])

    function handleReset() {
        dispatch({ type: TODO_ACTIONS.RESET_FILTERS })
        // setFilterTerm('');
        // setSortBy('createdAt');
        // setSortDirection('desc');
        // setFilterError('');
    };

    function handleError() {
        // setError('');
        dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })
    }

    function handleFilterError() {
        // setFilterError('');
        dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })
    }

    async function addTodo(todoTitle) {
        let newTodo = {
        id: Date.now(),
        title: todoTitle, 
        isCompleted: false
        };

        console.log('Add Start');
        // setTodoList((previous) => [newTodo, ...previous]);
        dispatch(
            { type: TODO_ACTIONS.ADD_TODO_START,
                payload: {
                    newList: [newTodo, ...todoList]
                }
            }
        );

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
                // setTodoList(prev => prev.map(todo => todo.id === newTodo.id ? data : todo))
                console.log('Add Success');
                dispatch(
                    { type: TODO_ACTIONS.ADD_TODO_SUCCESS,
                        payload: {
                            newList: todoList.map(todo => todo.id === newTodo.id ? data : todo)
                        }
                    }
                )
                invalidateCache();
            } else {
                // setTodoList(prev => prev.filter(todo => todo.id !== newTodo.id));
                throw new Error('Failed to add todo');
            }
        } catch(e) {
            // setError(`Error: ${e.name} | ${e.message}`);
            dispatch(
                { type: TODO_ACTIONS.ADD_TODO_ERROR,
                    payload: {
                        rollback: todoList.filter(todo => todo.id !== newTodo.id),
                        error: `Error: ${e.name} | ${e.message}`
                    }
                }
            );
            console.log('Add Error');
        }
    }

    async function completeTodo(id) {
        let rollback = todoList.find(todo => todo.id === id);

        // setTodoList((previous) => previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo));
        dispatch(
            {
                type: TODO_ACTIONS.COMPLETE_TODO_START, 
                payload: {
                    newList: todoList.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo)
                }
            }
        );

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
                // setTodoList(previous => previous.map(todo => todo.id === id ? {...rollback} : todo));
                throw new Error('Failed to complete todo.');
            } else {
                // setError('');
                dispatch (
                    { type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS }
                );
                invalidateCache();
            }

        } catch(e) {
            // setError(`Error: ${e.name} | ${e.message}`);  
            dispatch(
                {
                    type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
                    payload: {
                        rollback: todoList.map(todo => todo.id === id ? {...rollback} : todo),
                        error: `Error: ${e.name} | ${e.message}`
                    }
                }
            )
        }
    }

    async function updateTodo(editedTodo) {
        let rollback = [...todoList];

        const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo);
        
        // setTodoList(updatedTodos);

        dispatch( 
            {
                type: TODO_ACTIONS.COMPLETE_TODO_START,
                payload: { 
                    newList: [...updatedTodos]
                }
            }
        );

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
                // setTodoList(rollback);
                throw new Error('Failed to update todo.');
            } else {
                // setError('');
                dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS })
                invalidateCache();
            }
        } catch(e) {
            // setError(`Error: ${e.name} | ${e.message}`);
            dispatch(
                { 
                    type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
                    payload: {
                        error: `Error: ${e.name} | ${e.message}`, 
                        rollback: rollback
                    }
                }
            )
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

      <SortBy sortBy={sortBy} onSortByChange={(newSortBy) =>
        dispatch(
            {
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                    sortBy: newSortBy
                }

            }
        )
      } sortDirection={sortDirection} onSortDirectionChange={(newSortDirection) => 
        dispatch(
            {
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                    sortBy: newSortDirection 
                }
            }
        )
      }/>
      <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
      <TodoForm onAddTodo={addTodo} />

      <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} dataVersion={dataVersion} />
      {filterError ? (
        <div>
            <p>{filterError}</p>
            <button onClick={handleFilterError}>Clear Filter Error</button>
            <button onClick={handleReset}>Reset Filters</button>
        </div> 
      ) : null}
    </div>
    );
}

// export default function TodosPage({token}) {
//     const [todoList, setTodoList] = useState([]);
//     const [error, setError] = useState('');
//     const [isTodoListLoading, setIsTodoListLoading] = useState(false);
//     const [sortBy, setSortBy] = useState('createdAt');
//     const [sortDirection, setSortDirection] = useState('desc');
//     const [filterTerm, setFilterTerm] = useState('');
//     const [filterError, setFilterError] = useState('');
//     const [dataVersion, setDataVersion] = useState(0);

//     const debouncedFilterTerm = useDebounce(filterTerm, 300);

//     const invalidateCache = useCallback(() => {
//         setDataVersion(prev => prev + 1);
//     }, []);

//     const handleFilterChange = ((newTerm) => {setFilterTerm(newTerm); });

//     useEffect(() => {
//         async function fetchTodos() {
//             setIsTodoListLoading(true)
            
//             try {

//                 const paramsObject  ={
//                     sortBy,
//                     sortDirection,
//                     limit: 100
//                 };

//                 if (debouncedFilterTerm) { 
//                     paramsObject.find = debouncedFilterTerm;
//                 }

//                 const params = new URLSearchParams(paramsObject);

//                 const response = await fetch(`/api/tasks?${params}`, {
//                     headers: {
//                         'X-CSRF-TOKEN': token,
//                     },
//                     credentials: 'include',
//                 })
                
//                 if (response.ok) {
//                     const data = await response.json();
//                     setTodoList([...data.tasks])
//                     setFilterError('');
//                 } else if (response.status === 401) {
//                     throw new Error(`Unauthorized ${response.statusText}`)
//                 } else {
//                     throw new Error('An error other than unauthorized occured.')
//                 }
//             } catch (error) {
//                 if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
//                     setFilterError(`Error filtering/sorting todos: ${error.message}`);
//                 } else {
//                     setError(`Error fetching todos: ${error.message}`);
//                 }
//             } finally {
//                 setIsTodoListLoading(false);
//             }
//         }

//         if (token) {
//             fetchTodos();
//         }
//     }, [token, sortBy, sortDirection, debouncedFilterTerm])

//      function handleReset() {
//         setFilterTerm('');
//         setSortBy('createdAt');
//         setSortDirection('desc');
//         setFilterError('');
//     };

//     function handleError() {
//         setError('');
//     }

//     function handleFilterError() {
//         setFilterError('');
//     }

//     async function addTodo(todoTitle) {
//         let newTodo = {
//         id: Date.now(),
//         title: todoTitle, 
//         isCompleted: false
//         };

//         setTodoList((previous) => [newTodo, ...previous]);

//         try {
//             const response = await fetch('/api/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': token,
//             },
//             credentials: 'include',
//             body: JSON.stringify({title: newTodo.title, isCompleted: newTodo.isCompleted})
//             })

//             if (response.ok) {
//                 const data = await response.json();
//                 setTodoList(prev => prev.map(todo => todo.id === newTodo.id ? data : todo))
//                 invalidateCache();
//             } else {
//                 setTodoList(prev => prev.filter(todo => todo.id !== newTodo.id));
//                 throw new Error('Failed to add todo');
//             }
//         } catch(e) {
//             setError(`Error: ${e.name} | ${e.message}`);
//         }
//     }

//     async function completeTodo(id) {
//         let rollback = todoList.find(todo => todo.id === id);

//         setTodoList((previous) => previous.map(todo => todo.id === id ? {...todo, isCompleted: true} : todo));

//         try {
            
//             const response = await fetch(`/api/tasks/${id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': token,
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({isCompleted: true})
//             });

//             if (!response.ok) {
//                 setTodoList(previous => previous.map(todo => todo.id === id ? {...rollback} : todo));
//                 throw new Error('Failed to complete todo.');
//             } else {
//                 setError('');
//                 invalidateCache();
//             }

//         } catch(e) {
//             setError(`Error: ${e.name} | ${e.message}`);  
//         }
//     }

//     async function updateTodo(editedTodo) {
//         let rollback = [...todoList];

//         const updatedTodos = todoList.map(todo => todo.id === editedTodo.id ? {...editedTodo} : todo);
        
//         setTodoList(updatedTodos);

//         try {
//             const response = await fetch(`/api/tasks/${editedTodo.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRF-TOKEN': token,
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({title: editedTodo.title, isCompleted: editedTodo.isCompleted})
//             })

            

//             if (!response.ok) {
//                 setTodoList(rollback);
//                 throw new Error('Failed to update todo.');
//             } else {
//                 setError('');
//                 invalidateCache();
//             }
//         } catch(e) {
//             setError(`Error: ${e.name} | ${e.message}`);
//         }
        
//     }

//     return (
//     <div>
//       { error ? (
//         <div>
//         <p>{`${error}`}</p> 
//         <button onClick={handleError}>Clear Error</button>
//         </div>) : null 
//       }

//       { isTodoListLoading ? (<p>{`Loading...`}</p> ) : null }

//       <SortBy sortBy={sortBy} onSortByChange={setSortBy} sortDirection={sortDirection} onSortDirectionChange={setSortDirection}/>
//       <FilterInput filterTerm={filterTerm} onFilterChange={handleFilterChange}/>
//       <TodoForm onAddTodo={addTodo} />

//       <TodoList todoList={todoList} onCompleteTodo = {completeTodo} onUpdateTodo = {updateTodo} dataVersion={dataVersion} />
//       {filterError ? (
//         <div>
//             <p>{filterError}</p>
//             <button onClick={handleFilterError}>Clear Filter Error</button>
//             <button onClick={handleReset}>Reset Filters</button>
//         </div> 
//       ) : null}
//     </div>
//     );
// }