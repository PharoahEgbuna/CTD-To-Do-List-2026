import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from '../styles/Navigation.module.css';

function navLinkStyle (isActive) {
    if (isActive) {
        return (
            {
                fontWeight: 'bold',
                textDecoration: 'underline',
                color: '#E35336', 
                fontSize: '1.7rem'
                
            }
        );
    } else {
        return (
            {
                fontWeight: 'normal',
                textDecoration: 'none',
                color: '#E35336 ',
                fontSize: '1.5em'
            }
        );
    }
}

export default function Navigation() {

    const {isAuthenticated} = useAuth();

    return (
        <nav>
            <ul className={styles.NavigationDisplay}>
                <li>
                    <NavLink to="/about" style={({isActive}) => navLinkStyle(isActive)}>About</NavLink>
                </li>
                {isAuthenticated && (
                    <li>
                        <NavLink to="/todos" style={({isActive}) => navLinkStyle(isActive)}>Todos</NavLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <NavLink to="/profile" style={({isActive}) => navLinkStyle(isActive)}>Profile</NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/login" style={({isActive}) => navLinkStyle(isActive)}>Login</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}