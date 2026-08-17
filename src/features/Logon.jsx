import {useState } from 'react';

export default function Logon({onSetEmail, onSetToken}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(false);
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            setIsLoggingOn(true);
            const response = await fetch('api/users/logon/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'credentials': 'include',
                },
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
        <form >
            {authError && <p>{authError}</p>}
            <input
                htmlFor="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                htmlFor="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" onClick={handleSubmit} disabled={isLoggingOn}>
                {isLoggingOn ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    )
}