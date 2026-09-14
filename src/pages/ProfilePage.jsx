import {useAuth} from '../contexts/AuthContext.jsx';
import {useState, useEffect} from 'react';

export default function ProfilePage() {

    const { email, token, isAuthenticated } = useAuth();
    const [todoStats, setTodoStats] = useState({total: 0, completed: 0, active: 0});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        async function fetchTodoStats() {
            if (!token) {
                setError('Log in to view profile.');
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                setError('');

                const options = {
                    method: 'GET',
                    headers: { 
                        'X-CSRF-TOKEN': token,
                    },
                    credentials: 'include',
                };

                const response = await fetch(`/api/tasks`, options);

                if (response.status === 401) {
                    throw new Error('Unauthorized');
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch todos');
                }

                const data = await response.json();

                let todoArray = [];

                if (data.pagination?.pages > 1) {
                    for (let i = 1; i <= data.pagination.pages; i++) {
                        const nextPageResponse = await fetch(`/api/tasks?page=${i}`, options)

                        if (!nextPageResponse.ok) {
                            throw new Error('Failed to fetch todos');
                        }

                        const nextPageData = await nextPageResponse.json();
                        const tasks = Array.isArray(nextPageData.tasks) ? nextPageData.tasks : [];
                        todoArray.push(...tasks);
                    }
                } else {
                    todoArray = Array.isArray(data.tasks) ? data.tasks : []
                }

                const total = todoArray.length;
                const completed = todoArray.filter((todo) => todo.isCompleted).length
                const active = total - completed;
                setTodoStats({ total, completed, active });
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
           {error && (
                <section>
                    <h2>Error Loading Todo Stats</h2>
                    <p>{`Unable to load todo stats due to the following error: ${error}`}</p>
                    <p>Please refresh the page or try again later.</p>
                </section>
                )
            }
            {!loading && !error && (
                <div>
                    <h1>Profile</h1>
                    <p>Welcome, {email || 'User'}!</p>
                    <p>Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
                    <section>
                        <div>
                            <h2>Todo Statistics</h2>
                            <article>
                                <h3>Total Tasks</h3>
                                <p>{todoStats.total}</p>
                            </article>
                            <article>
                                <h3>Completed Tasks</h3>
                                <p>{todoStats.completed}</p>
                            </article>
                            <article>
                                <h3>Active Tasks</h3>
                                <p>{todoStats.active}</p>
                            </article>
                            <article>
                                <h3>Completion Rate</h3>
                                <p>{todoStats.total > 0 ? `${((todoStats.completed / todoStats.total) * 100).toFixed(2)}%` : 'N/A'}</p>
                            </article>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}