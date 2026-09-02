import {useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Logon() {

    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoggingOn(true);

        try {
            // const response = await fetch(`/api/users/logon/`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     credentials: 'include',
            //     body: JSON.stringify({email, password})
            // });
            // const data = await response.json();

            const result = login(email, password);

            if (result.success) {
                setAuthError('');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            setAuthError(`Error: ${error.name} | ${error.message}`);
        } finally {
            setIsLoggingOn(false);
        }
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
    )
}