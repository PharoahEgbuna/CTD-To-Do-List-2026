import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'
import { useNavigate, useLocation } from 'react-router';
import styles from '../styles/LoginPage.module.css';

export default function LoginPage() {

    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    const from = location.state?.from?.pathname || '/todos';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, {replace: true});
        }
    }, [isAuthenticated, navigate, from]);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoggingOn(true);

        const formEmail = e.target.email.value;
        const formPassword = e.target.password.value;

        if (!formEmail.trim() || !formPassword.trim()) {
            setAuthError('All fields are required.');
        } else if (password.length < 8) {
            setAuthError('Password must be at least 8 characters.');
        } else {
            const result = await login(email, password);

            if (result.success) {
                setAuthError('');
                navigate(from, {replace: true});
            } else {
                setAuthError(result.error);
            }
        }

        setIsLoggingOn(false);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.LoginPageDisplay} noValidate>
            {authError ? <p><b>{authError}</b></p> : null}
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