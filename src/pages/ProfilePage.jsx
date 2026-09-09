import { useAuth } from '../contexts/AuthContext.jsx';
import { useState, useEffect } from 'react';

export default function ProfilePage() {

    const { token } = useAuth();
    const [todoStats, setTodoStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchTodoStats() {
            if (!token) return;

            try {
                setLoading(true);
                setError('');

                const options = {
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                };

                const response = await fetch('/api/tasks', options);

                if (response.status === 401) {
                    throw new Error('Unauthorized.');
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch todos.');
                }

                const todos = await response.json();

                const total = todos.tasks.length;

                const completed = todos.tasks.filter((todo) => todo.isCompleted).length;
                const active = total - completed;

                setTodoStats({total, completed, active});
            } catch (err) {
                setError(`Error loading statistics: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }
        
        fetchTodoStats();
    }, [token]);

    return (
        <div>
            {loading && <p>Loading todo stats...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
                <div>
                    <h1>Profile</h1>
                    <p>Welcome, user!</p>
                    <p>Total tasks: {todoStats.total}</p>
                    <p>Completed tasks: {todoStats.completed}</p>
                    <p>Active tasks: {todoStats.active}</p>
                </div>
            )}
        </div>
    );
}