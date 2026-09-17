import styles from '../styles/FilterInput.module.css';

export default function FilterInput({ filterTerm, onFilterChange }) {
    function handleFilterChange(event) {
        onFilterChange(event.target.value)
    }

    return (
        <div className={styles.filterInputDisplay}>
            <label htmlFor='filterInput'>Search list: </label>
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