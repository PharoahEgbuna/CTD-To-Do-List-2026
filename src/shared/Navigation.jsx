import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';


function navLinkStyle (isActive) {
    if (isActive) { 

        return (
            {
                fontWeight: 'bold',
                textDecoration: 'underline',
            }
        );
    } else {
        console.log(isActive);
        return (
            {
                fontWeight: 'normal',
                textDecoration: 'none',
            }
        );
    }
}

export default function Navigation() {

    const { isAuthenticated } = useAuth();

    return (
        <nav>
            <ul style={
                {

                    listStyle: 'none',
                    display: 'flex', 
                    gap: '1rem',
                    padding: 0
                }
            }>
                <NavLink to="/about" style={({ isActive }) => navLinkStyle(isActive)}>About</NavLink>
                { isAuthenticated && (
                    <NavLink to="/todos" style={({ isActive }) => navLinkStyle(isActive)}>Todos</NavLink>
                )}
                { isAuthenticated && (
                    <NavLink to="/profile" style={({ isActive }) => navLinkStyle(isActive)}>Profile</NavLink>
                )}
                { !isAuthenticated && (
                    <NavLink to="/login" style={({ isActive }) => navLinkStyle(isActive)}>Login</NavLink>
                )}
            </ul>
        </nav>
    )
}