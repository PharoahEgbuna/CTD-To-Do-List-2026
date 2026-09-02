import { useAuth } from '../contexts/AuthContext.jsx';
import { useState } from 'react';

export default function Logoff() {

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState('');

    const { token, logout } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoggingOut(true);

        try {
            const result = await logout(token); 

            if (result.success) {
                setLogoutError('');
            } else {
                throw new Error(result.error)
            }
        } catch(error) {
            setLogoutError(`Error: ${error.name} | ${error.message}`);
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {logoutError ? <p>{logoutError}</p> : null}
            <button type="submit" disabled={isLoggingOut}>
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
            </button>
        </form>
    )
}