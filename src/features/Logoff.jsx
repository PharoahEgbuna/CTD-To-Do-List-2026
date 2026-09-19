import { useAuth } from '../contexts/AuthContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Logoff() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoggingOut(true);
        
        const result = await logout(); 

        if (result.success) {
             navigate('/login');
        } else {
            setIsLoggingOut(false);
            setLogoutError(result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {logoutError ? <p>{logoutError}</p> : null}
            <button type="submit" disabled={isLoggingOut}>
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
            </button>
        </form>
    );
}