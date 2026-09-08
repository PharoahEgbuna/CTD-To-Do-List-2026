import {useLocation, useNavigate} from 'react-router';
import {useAuth} from '../contexts/AuthContext.jsx';
import { useEffect } from 'react';

export default function RequireAuth({ children }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    if (!isAuthenticated) {
        return (<p>Redirecting to login...</p>)
    } else {
        return children;
    }
}