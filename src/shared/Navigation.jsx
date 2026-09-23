import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from '../styles/Navigation.module.css';

function navLinkStyle (isActive) {
    if (isActive) {
        return styles.isActive;
    } else {
        return styles.notActive;
    }
}

export default function Navigation() {

    const {isAuthenticated} = useAuth();

    return (
        <nav>
            <ul className={styles.NavigationDisplay}>
                <li>
                    <NavLink to="/about" className={({isActive}) => navLinkStyle(isActive)}>About</NavLink>
                </li>
                {isAuthenticated && (
                    <li>
                        <NavLink to="/todos" className={({isActive}) => navLinkStyle(isActive)}>Todos</NavLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <NavLink to="/profile" className={({isActive}) => navLinkStyle(isActive)}>Profile</NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to="/login" className={({isActive}) => navLinkStyle(isActive)}>Login</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}