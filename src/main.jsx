import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {AuthProvider} from '/src/contexts/AuthContext.jsx'
import {BrowserRouter} from 'react-router';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
