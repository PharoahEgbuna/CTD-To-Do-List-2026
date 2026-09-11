import { useSearchParams } from 'react-router';

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const nextParams = new URLSearchParams(searchParams);

  const handleStatusChange = (status) => {
    if (status === 'all') {
      nextParams.delete('status');
    } else {
      nextParams.set('status', status);
    }
    setSearchParams(nextParams);
  };

  return (
    <div>
      <label htmlFor='statusFilter'>Show:</label>
      <select
        id='statusFilter'
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value='all'>All Todos</option>
        <option value='active'>Active Todos</option>
        <option value='completed'>Completed Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;