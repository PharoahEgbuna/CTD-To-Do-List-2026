import { StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext } from '/src/contexts/AuthContext.jsx'

export function AuthProvider({ children }) {
  // State for authentication
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  
  // Functions will go here...
  const login = async (userEmail, password) => {
    try {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: userEmail, password}),
            credentials: 'include',
        };

        const res = await fetch('/api/users/logon', options);
        const data = await res.json();

        if (res.status === 200 && data.name && data.csrfToken) {
            setEmail(data.name);
            setToken(data.csrfToken);
            return { success: true };
        } else {
            return { 
                success: false,
                error: `Authentication failed: ${data?.message}`,
            };
        }
    } catch (error) {
        return {
            success: false, error: 'Network error during login'   
        };
    }
  };

  const logout = async (token) => {
    if (!token) {
        setEmail('');
        setToken('');
        return { success: true }
    }

    try {

        const options = {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token
            }
        };

        const res = await fetch('/api/user/logoff', options);

        if (res.status === 200) {
            return { success: true }
        } else {
            return { success: false, 
                error: `Signout error`
            }
        } 
    } catch(error) {
        return {
            success: false, 
            error: 'Network error during logout'   
        };
    } finally {
        setEmail('');
        setToken('');
    }
  }
  // Context value object
  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </StrictMode>
)
