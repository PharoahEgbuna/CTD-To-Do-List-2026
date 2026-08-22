export default function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}) {
    
    function handleOrder (event) {
        onSortDirectionChange(event.target.value);
    }

    function handleSort (event) {
        onSortByChange(event.target.value);
    }
    
    
    return (
        <div>
            <label htmlFor={sortBy}>Sort By </label>
            <select id={sortBy} onChange={handleSort}>
                <option value='createdAt'>Created At</option>
                <option value='title'>Title</option>
            </select>

            <label htmlFor={sortDirection}>Order </label>
            <select id={sortDirection} onChange={handleOrder}>
                <option value='desc'>Descending</option>
                <option value='asc'>Ascending</option>
            </select>
        </div>
    );
}