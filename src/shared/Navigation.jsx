import {NavLink} from 'react-router';
import {useAuth} from '../contexts/AuthContext.jsx';


function navLinkStyle ({isActive}) {
    return {
        fontWeight: isActive ? 'bold' : 'normal',
        textDecoration: isActive ? 'underline' : 'none',
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
                    <NavLink to="/about" style={navLinkStyle}>About</NavLink>
                </li>
                { isAuthenticated && (
                    <li>
                        <NavLink to="/todos" style={navLinkStyle}>Todos</NavLink>
                    </li>
                )}
                { isAuthenticated && (
                    <li>
                        <NavLink to="/profile" style={navLinkStyle}>Profile</NavLink>
                    </li>
                )}
                { !isAuthenticated && (
                    <li>
                        <NavLink to="/login" style={navLinkStyle}>Login</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
}