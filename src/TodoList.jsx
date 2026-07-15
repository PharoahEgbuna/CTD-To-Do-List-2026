import TodoListItem from './TodoListItem.jsx';

function TodoList({todoList}) {

    return ( 
      <ul>
        {todoList.map(todo => <TodoListItem todo={todo} />)}
      </ul>
    );
}

export default TodoList;