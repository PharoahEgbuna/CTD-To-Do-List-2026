import { useSearchParams } from 'react-router';
import styles from '../styles/StatusFilter.module.css';

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status) => {
    const nextParams = new URLSearchParams(searchParams);

    if (status === 'all') {
      nextParams.delete('status');
    } else {
      nextParams.set('status', status);
    }
    setSearchParams(nextParams);
  };

  return (
    <div className={styles.StatusFilterDisplay}>
      <label htmlFor='statusFilter'>Showing:</label>
      <select
        id='statusFilter'
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value='all'>All Todos</option>
        <option value='active'>Active Todos</option>
        <option value='completed'>Complete Todos</option>
      </select>
    </div>
  );
}

export default StatusFilter;