import { useAuth } from '../contexts/AuthContext.jsx' 

export default function Header() {

    const { isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
        return (<h1>Todo List</h1>);
    }
}