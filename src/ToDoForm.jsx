function TodoForm() {
    return (
        <form>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" />
            <button type="submit" disabled>Add ToDo</button>
        </form>

    );
}

export default TodoForm;