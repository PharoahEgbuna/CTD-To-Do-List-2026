import {useState } from 'react';

export default function Logon({onSetEmail, onSetToken}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoggingOn(true);
        try {
            const response = await fetch(`/api/users/logon/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if (response.status === 200 && data.name && data.csrfToken) {
                onSetEmail(data.name);
                onSetToken(data.csrfToken);
            } else {
                setAuthError(`Authentication failed: ${data?.message}` )
            }

        } catch (error) {
            setAuthError(`Error: ${error.name} | ${error.message}`);
        } finally {
            setIsLoggingOn(false);
        }
    }

    return (
        <form>
            {authError && <p>{authError}</p>}
            <label htmlFor='email'>
                <input
                id = "email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
                <input
                htmlFor="password"
                id = "password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <button type="submit" onClick={handleSubmit} disabled={isLoggingOn}>
                {isLoggingOn ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    )
}