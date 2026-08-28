
export default function FilterInput({filterTerm, onFilterChange}) {

    function handleFilterChange(event) {
        onFilterChange(event.target.value)

    }

    return (
        <div>
            <label htmlFor='filterInput'>Search todos: </label>
            <input
            id='filterInput'
            type='text'
            value={filterTerm}
            onChange={handleFilterChange}
            placeholder='Search by title...'>
            </input>
        </div>
    );
}