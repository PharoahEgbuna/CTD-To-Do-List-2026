
export const TODO_ACTIONS = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',


    ADD_TODO_START: 'ADD_TODO_START',
    ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
    ADD_TODO_ERORR: 'ADD_TODO_ERROR',


    COMPLETE_TODO_START: 'COMPLETE_TODO_START',
    COMPLETE_TODO_SUCCESS: 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_ERROR: 'COMPLETE_TODO_FAILURE',


    UPDATE_TODO_START: 'UPDATE_TODO_START',
    UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
    UPDATE_TODO_ERROR: 'UPDATE_TODO_ERROR',


    SET_SORT: 'SET_SORT',
    SET_FILTER: 'SET_FILTER',
    CLEAR_ERROR: 'CLEAR_ERROR',
    RESET_FILTERS: 'RESET_FILTERS'
};

export const initialTodoState = {
    todoList: [],
    error: '',
    isTodoListLoading: true,
    sortBy: 'createdAt',
    sortDirection: 'asc',
    filterTerm: '',
    filterError: '',
    dataVersion: 0,
    rollback: {
        todoList: [],
        error: '',
        isTodoListLoading: true,
        sortBy: 'createdAt',
        sortDirection: 'asc',
        filterTerm: '',
        filterError: '',
        dataVersion: 0,
    }
};

export function todoReducer(state, action) {
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
                todoList: [...action.tasks], //receives tasks array from payload
                isTodoListLoading: false,
            };

        case TODO_ACTIONS.FETCH_ERROR:
            return {
                ...state,
                error: action.message || '', //receives error object from payload, action object receives error message
                filterError: action.filterMessage || '',
                isTodoListLoading: false
            };
        
        //Add Todo Cases  
        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                todoList: [...action.newTodo, ...initialTodoState.todoList], //receives newTodo from payload
                error: ''
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                todoList: [...action.todoList, ...initialTodoState.todoList] //receive api todo from payload
            };

        case TODO_ACTIONS.ADD_TODO_ERORR:
            return {
                ...state,
                error: action.error, //receive error from payload
                todoList: [...action.rollbackList] //receives rollback list from action payload
            };

        //Complete Todo Cases 
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return {
                 ...state,
                 todoList: [action.todoList], //received from payload
                 error: '',
            };

        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return {
                ...state,
                todoList: [action.filteredlist], //receive filtered list from payload
            };

        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                todoList: [...action.rollback], //received from payload 
                error: action.errorMessage //received from payload
            };

        //Update Todo Cases
        case TODO_ACTIONS.UPDATE_TODO_START:
            return {
                ...state, 
                todoList: [...action.updatedList], //received from payload
                error: ''
            };

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return {
                ...state,
                todoList: [...action.updatedApiList], //received from payload
            };

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state, 
                todoList: [...action.rollbackList], //received from payload
                erorr: action.errorMessage //received from payload
            };

        //Sorting and Error Cases 
        case TODO_ACTIONS.SET_SORT:
             return {
                ...state,
                sortBy: action.sortBy || 'createdAt', //received from payload
                sortDirection: action.sortDirection || 'asc',
            };

        case TODO_ACTIONS.SET_FILTER:
             return {
                ...state,
                filter: action.filter
            };

        case TODO_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                filterError: '',
            };

        case TODO_ACTIONS.RESET_FILTERS:
             return {
                ...state,
                sortBy: initialTodoState.rollback.sortBy,
                sortDirection: initialTodoState.rollback.sortDirection,
                error: '',
                filterError: '',
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}