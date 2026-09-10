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
                <li>
                    <NavLink to="/about" style={({ isActive }) => navLinkStyle(isActive)}>About</NavLink>
                </li>
                { isAuthenticated && (
                    <li>
                        <NavLink to="/todos" style={({ isActive }) => navLinkStyle(isActive)}>Todos</NavLink>
                    </li>
                )}
                { isAuthenticated && (
                    <li>
                        <NavLink to="/profile" style={({ isActive }) => navLinkStyle(isActive)}>Profile</NavLink>
                    </li>
                )}
                { !isAuthenticated && (
                    <li>
                        <NavLink to="/login" style={({ isActive }) => navLinkStyle(isActive)}>Login</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
}