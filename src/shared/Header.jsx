import { useAuth } from '../contexts/AuthContext.jsx' 

export default function Header() {

    const { isAuthenticated } = useAuth();
    
    return (
        <h1>Todo List</h1>  
    );
}