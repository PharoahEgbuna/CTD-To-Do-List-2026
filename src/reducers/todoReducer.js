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
                todoList: [...action.payload.todos],
                isTodoListLoading: false,
            };

        case TODO_ACTIONS.FETCH_ERROR:
            return {
                ...state, 
                filterError: action.payload.message,
                isTodoListLoading: false
            };
            
        
        //Add Todo Cases     
        case TODO_ACTIONS.ADD_TODO_START:
            return {
                ...state,
                todoList: [action.payload.newTodo, ...state.todoList],
                error: '',
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.payload.id ? action.payload.apiTodo : todo),
            };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                error: action.payload.error,
                todoList: action.payload.rollback
            };

        //Complete Todo Cases 
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return {
                ...state,
                todoList: state.todoList.map(todo => todo.id === action.payload.id ?
                    {...todo, isCompleted: true} : todo), 
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
                    action.payload.rollback : todo
                ),
                error: action.payload.error,
            };

        //Update Todo Cases
        case TODO_ACTIONS.UPDATE_TODO_START:
            return {
                ...state, 
                todoList: state.todoList.map(todo => todo.id === action.payload.editedTodo.id ?
                    {...action.payload.editedTodo} : todo 
                ),
                error: '',
            };

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return {
                ...state
            };

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state, 
                todoList: action.payload.rollback, 
                error: action.payload.error,
            };

        //Sorting, Data Version and Error Cases 
        case TODO_ACTIONS.SET_SORT:
            return {
                ...state,
                sortBy: action.payload.sortBy.newSortBy || action.payload.sortBy.sortBy,
                sortDirection: action.payload.sortBy.newSortDirection || action.payload.sortBy.sortDirection
            };

        case TODO_ACTIONS.SET_FILTER:
             return {
                ...state,
                filterTerm: action.payload.newTerm
            };
        
        case TODO_ACTIONS.SET_DATA_VERSION:
            return {
                ...state,
                dataVersion: state.dataVersion + 1
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
                sortDirection: 'asc',
                filterTerm: '',
                filterError: ''
            };

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}