import { useAuth } from '../contexts/AuthContext.jsx' 
import Logoff from '../features/Logoff.jsx';
import Navigation from './Navigation.jsx';
import styles from '../styles/Header.module.css';

export default function Header() {

    const { isAuthenticated } = useAuth();
    
    return (
        <div className={styles.HeaderDisplay}> 
            <h1>Todo List</h1>
            <Navigation/>
            {isAuthenticated && <Logoff/>}
        </div> 
    );
}