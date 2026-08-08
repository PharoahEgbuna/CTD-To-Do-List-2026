import TextInputWithLabel from '/src/shared/TextInputWithLabel.jsx';
import { useState } from 'react';

function TodoListItem({todo, onCompleteTodo, onUpdateTodo}) {

    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    function handleCancel() {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    function handleEdit(event) {
        setWorkingTitle(event.target.value)
    }

    function handleUpdate(event) {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        onUpdateTodo({...todo, title: workingTitle});
        setIsEditing(false);
    }

    return (
    <li>
        <form onSubmit={handleUpdate}>
            {isEditing ? (
                <>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit}/>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="button" onClick={handleUpdate}>Update</button>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit}/>
                </> 
            ) : (
                <>
                <label>
                    <input 
                        type="checkbox"
                        id = {`checkbox${todo.id}`}
                        checked={todo.isCompleted}
                        onChange={() => onCompleteTodo(todo.id)}
                        />
                </label>
                <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                </>
            )}
        </form>
    </li>
    );
}

export default TodoListItem;