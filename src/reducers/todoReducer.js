
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
                todoList: [...action.payload.todos], //receives tasks array from payload
                isTodoListLoading: false,
                filterError: '',
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
            console.log(action.payload.newList)
            return {
                ...state,
                todoList: [...action.payload.newList], //from payload
                error: ''
            };

        case TODO_ACTIONS.ADD_TODO_SUCCESS:
            console.log(action.payload.newList)
            return {
                ...state,
                todoList: [...action.payload.newList], //from payload
            };

        case TODO_ACTIONS.ADD_TODO_ERROR:
            return {
                ...state,
                error: action.payload.error, //from payload
                todoList: [...action.payload.rollback] //from  payload
            };

        //Complete Todo Cases 
        case TODO_ACTIONS.COMPLETE_TODO_START:
            return {
                 ...state,
                 todoList: [action.payload.newList], //from payload
                 error: '',
            };

        case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
            return {
                ...state, //nothing changes if successful
            };

        case TODO_ACTIONS.COMPLETE_TODO_ERROR:
            return {
                ...state,
                todoList: [...action.payload.rollback], //received from payload 
                error: action.payload.error //received from payload
            };

        //Update Todo Cases
        case TODO_ACTIONS.UPDATE_TODO_START:
            return {
                ...state, 
                todoList: [...action.payload.newList], //received from payload
                error: ''
            };

        case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
            return {
                ...state,  //nothing changes if successful
                error: '',
            };

        case TODO_ACTIONS.UPDATE_TODO_ERROR:
            return {
                ...state, 
                todoList: [...action.oayload.rollback], //received from payload
                erorr: action.payload.error //received from payload
            };

        //Sorting, Data Version and Error Cases 
        case TODO_ACTIONS.SET_SORT:
            if (action.payload.newSortBy) {
                return {
                    ...state,
                    sortBy: action.payload.sortBy.newSortBy
                }
            } else {
                return {
                    ...state, 
                    sortDirection: action.payload.sortBy.newSortDirection
                }
            };

        case TODO_ACTIONS.SET_FILTER:
             return {
                ...state,
                filter: action.payload.filter
            };
        
        case TODO_ACTIONS.SET_DATA_VERSION:
            return {
                ...state,
                dataVersion: action.payload.newDataVersion
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