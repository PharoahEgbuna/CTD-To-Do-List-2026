import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate, useLocation } from 'react-router';

export default function Logon() {

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    const from = location.state?.from?.pathname || '/todos';

    useEffect(() => { 
        if (isAuthenticated) {
            navigate(from, { replace: true });
        } else {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await login(email, password);

        if (result.success) {
            setAuthError('');
        } else {
            setAuthError(result.error);
        }

        setIsLoggingOn(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {authError ? <p>{authError}</p> : null}
            <label htmlFor='email'>Enter email:</label>
            <input
                id = "email"
                type= "email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <label htmlFor="password">Enter password:</label>
            <input
                id = "password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={isLoggingOn}>
                {isLoggingOn ? 'Logging in...' : 'Log On'}
            </button>
        </form>
    );
}