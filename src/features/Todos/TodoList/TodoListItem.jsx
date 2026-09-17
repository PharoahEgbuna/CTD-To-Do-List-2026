import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx'; 
import { isValidTodoTitle } from '../../../utils/todoValidation.js';
import { useState } from 'react';
import styles from '../../../styles/TodoListItem.module.css'

function TodoListItem({todo, onCompleteTodo, onUpdateTodo, onUncheckTodo, onDeleteTodo}) {

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
        if (!isEditing) {
            return;
        }
        
        event.preventDefault();

        onUpdateTodo({...todo, title: workingTitle});
        setIsEditing(false);
    }

    function handleCheck(event, id) {
        if (event.target.checked) {
            onCompleteTodo(id)
        } else {
            onUncheckTodo(id);
        }
    }

    function handleDelete(event, id) {
        event.preventDefault();
        onDeleteTodo(id);
        setIsEditing(false);
    }

    return (
    <li>
        <form onSubmit={handleUpdate} className={styles.todoListItemDisplay}>
            {isEditing ? (
                <>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit} elementId={`title${todo.id}`} labelText="Edit Todo:" />
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit" onClick={handleUpdate} disabled={!isValidTodoTitle(workingTitle)}>
                    Update
                </button>
                <button type ='submit' onClick={(e) => handleDelete(e, todo.id)}>
                    Delete
                </button>
                </> 
            ) : (
                <>
                <label>
                    <input 
                        type='checkbox'
                        id = {`checkbox${todo.id}`}
                        checked={todo.isCompleted}
                        onChange={(e) => handleCheck(e, todo.id)}
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