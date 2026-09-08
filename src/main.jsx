import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from '/src/contexts/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
