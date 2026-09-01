export const TODO_ACTIONS = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',


    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERROR: 'ADD_TODO_ERROR',


    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_ERROR',


    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',


    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    SET_DATA_VERSION: 'SET_DATA_VERSION',
    CLEAR_ERROR: 'CLEAR_ERROR',
    CLEAR_FILTER_ERROR: 'CLEAR_FILTER_ERROR',
    RESET_FILTERS: 'RESET_FILTERS'
};

export const initialTodoState = {
    todoList: [],
    isTodoListLoading: true,
    sortBy: 'createdAt',
    sortDirection: 'asc',
    error: '',
    filterError: '',
    filterTerm: '',
    dataVersion: 0,
};

export function todoReducer(state, action) {
    // console.log('Dispatched action:', action.type, action.payload);
    switch (action.type) {
        case TODO_ACTIONS.FETCH_START:
            return {
                ...state,
                isTodoListLoading: true,
                error: '',
                filterError: '',
            };

        case TODO_ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                todoList: [...action.payload.todos], //receives tasks array from payload
                isTodoListLoading: false,
            };

        case TODO_ACTIONS.FETCH_ERROR:
            return {
                ...state,
                error: action.payload.message,
                filterError: action.payload.isFilterError,
                isTodoListLoading: false,
            };
        
        //Add Todo Cases     
        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                todoList: [action.payload.newTodo, ...state.todoList], //from payload
                error: ''
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.payload.id ? action.payload.newTodo : todo), //from payload
            };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                error: action.payload.error, //from payload
                todoList: state.todoList.filter(todo => todo.id !== action.payload.id)
            };

        //Complete Todo Cases 
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return {
                 ...state,
                 todoList: state.todoList.map(todo => todo.id === action.payload.id ?
                    {...todo, isCompleted: true} : todo), //from payload
                 error: '',
            };

        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return {
                ...state, //nothing changes if successful
            };

        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.payload.id ?
                    {...action.payload.rollback} : todo
                ), //received from payload 
                error: action.payload.error //received from payload
            };

        //Update Todo Cases
        case TODO_ACTIONS.UPDATE_TODO_START:
            return {
                ...state, 
                todoList: state.todoList.map(todo => todo.id === action.payload.editedTodo.id ?
                    {...action.payload.editedTodo} : todo 
                ),
                error: ''
            };

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return {
                ...state
            };

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state, 
                todoList: action.payload.rollback, 
                error: action.payload.error
            };

        //Sorting, Data Version and Error Cases 
        case TODO_ACTIONS.SET_SORT:
            if (action.payload.sortBy) {
                return {
                    ...state,
                    sortBy: action.payload.sortBy
                }
            } else {
                return {
                    ...state, 
                    sortDirection: action.payload.sortDirection
                }
            };

        case TODO_ACTIONS.SET_FILTER:
             return {
                ...state,
                filterTerm: action.payload.filter
            };
        
        case TODO_ACTIONS.SET_DATA_VERSION:
            return {
                ...state,
                dataVersion: state.newDataVersion + 1
            };

        case TODO_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: ''
            };

        case TODO_ACTIONS.CLEAR_FILTER_ERROR:
            return {
                ...state,
                filterError: '',
            };

        case TODO_ACTIONS.RESET_FILTERS:
             return {
                ...state,
                sortBy: 'createdAt',
                sortDirection: 'desc',
                filterTerm: '',
                filterError: ''
            };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}