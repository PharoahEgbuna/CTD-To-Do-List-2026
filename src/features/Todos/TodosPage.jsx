import TodoForm from './TodoForm.jsx' 
import TodoList from './TodoList/TodoList.jsx';
import SortBy from '../../shared/SortBy.jsx';
import useDebounce from '../../utils/useDebounce.js';
import FilterInput from '../../shared/FilterInput.jsx';
import {todoReducer, initialTodoState, TODO_ACTIONS} from '../../reducers/todoReducer.js';
import {useEffect, useCallback, useReducer} from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';


export default function TodosPage() {

    const { token } = useAuth(); 
    const [state, dispatch] = useReducer(todoReducer, initialTodoState);
    const {
        todoList, 
        isTodoListLoading,
        sortBy,
        sortDirection,
        error, 
        filterError,
        filterTerm,
        dataVersion
    } = state;

    const debouncedFilterTerm = useDebounce(filterTerm, 300);

    useEffect(() => {
        async function fetchTodos() {
            
            dispatch({ type: TODO_ACTIONS.FETCH_START });
            
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

                } else if (response.status === 401) {
                    throw new Error(`Unauthorized ${response.statusText}`)
                } else {
                    throw new Error('An error other than unauthorized occured.')
                }
            } catch (error) {
                if (debouncedFilterTerm || sortBy !== 'createdAt' || sortDirection !== 'desc') {
                    dispatch({
                        type: TODO_ACTIONS.FETCH_ERROR,
                        payload: {
                            message: `Error filtering/sorting todos: ${error.message}`,
                            isFilterError: true
                        }
                    }) 
                } else {
                    dispatch({
                        type: TODO_ACTIONS.FETCH_ERROR,
                        payload: {
                            message: `Error fetching todos: ${error.message}`,
                            isFilterError: false
                        }
                    })               
                }

            }
        }

        if (token) {
            fetchTodos();
        }
    }, [token, sortBy, sortDirection, debouncedFilterTerm]);


    const handleFilterChange = ((newTerm) =>
        dispatch(
            { 
                type: TODO_ACTIONS.SET_FILTER,
                payload: {
                    newTerm
                }
            }
        )
    );

    function handleReset() {
        dispatch({ type: TODO_ACTIONS.RESET_FILTERS })
    };

    function handleError() {
        dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })
    }

    function handleFilterError() {
        dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })
    }

    const invalidateCache = useCallback(() => {
        dispatch(
            { 
                type: TODO_ACTIONS.SET_DATA_VERSION,
                payload: {
                    dataVersion
                }
            }
        )
    }, [dataVersion]);

    async function addTodo(todoTitle) {

        let newTodo = {
        id: Date.now(),
        title: todoTitle, 
        isCompleted: false
        };

        
        dispatch(
            { type: TODO_ACTIONS.ADD_TODO_START,
                payload: {
                    newTodo
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
                dispatch(
                    { type: TODO_ACTIONS.ADD_TODO_SUCCESS,
                        payload: {
                            apiTodo: data,
                            id: newTodo.id
                        }
                    }
                );
                invalidateCache();
            } else {
                throw new Error('Failed to add todo');
            }
        } catch(e) {
            dispatch(
                { type: TODO_ACTIONS.ADD_TODO_ERROR,
                    payload: {
                        error: `Error: ${e.name} | ${e.message}`,
                        id: newTodo.id
                    }
                }
            );
        }
    }

    async function completeTodo(id) {
        const rollback = todoList.find(todo => todo.id === id);

        dispatch(
            {
                type: TODO_ACTIONS.COMPLETE_TODO_START, 
                payload: { id }
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
                throw new Error('Failed to complete todo.');
            } else {
                dispatch (
                    { type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS }
                );
                invalidateCache();
            }

        } catch(e) {
            dispatch(
                {
                    type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
                    payload: {
                        error: `Error: ${e.name} | ${e.message}`,
                        id,
                        rollback
                    }
                }
            );
        }
    }

    async function updateTodo(editedTodo) {
        const rollback = [...todoList];
        
        dispatch( 
            {
                type: TODO_ACTIONS.UPDATE_TODO_START,
                payload: { 
                    editedTodo
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
                throw new Error('Failed to update todo.');
            } else {
                dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS })
                invalidateCache();
            }
        } catch(e) {
            dispatch(
                { 
                    type: TODO_ACTIONS.UPDATE_TODO_ERROR,
                    payload: {
                        error: `Error: ${e.name} | ${e.message}`, 
                        rollback
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
                    sortBy: {newSortBy, sortDirection}
                }

            }
        )
      } sortDirection={sortDirection} onSortDirectionChange={(newSortDirection) => 
        dispatch(
            {
                type: TODO_ACTIONS.SET_SORT,
                payload: {
                    sortDirection: {newSortDirection, sortBy}
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