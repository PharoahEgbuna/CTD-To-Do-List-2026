import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {

    const [workingTodoTitle, setWorkingTodoTitle] = useState('');

    const inputRef = useRef();

    const handleAddTodo = (event) => { 
        event.preventDefault();

        if (workingTodoTitle) {
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle('');
        }
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                ref = {inputRef}
                value = {workingTodoTitle}
                onChange = {(event) => setWorkingTodoTitle(event.target.value)}
                elementId = "todoTitle"
                labelText = "Todo"
            />
            <button type="submit"
            disabled={!workingTodoTitle.trim()}>
                Add Todo
            </button>
        </form>
    );
}

export default TodoForm;
