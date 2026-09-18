import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../utils/todoValidation.js'
import { useRef, useState } from 'react';
import styles from '../../styles/TodoForm.module.css';

function TodoForm({ onAddTodo }) {

    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();

        if (isValidTodoTitle(workingTodoTitle)) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle('');
        }
    };

    return (
        <form onSubmit={handleAddTodo} className={styles.TodoFormDisplay}> 
            <TextInputWithLabel
                ref = { inputRef }
                value = { workingTodoTitle }
                onChange = { (event) => setWorkingTodoTitle(event.target.value) }
                elementId = "todoTitle"
                labelText = "Enter New Todo:"
            />
            <button type="submit"
            disabled={ !isValidTodoTitle(workingTodoTitle) }>
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;
