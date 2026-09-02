import Header from './shared/Header.jsx';
import TodosPage from './features/Todos/TodosPage.jsx';
import Logon from './features/Logon.jsx';
import Logoff from './features/Logoff.jsx';
import './App.css'

import { useAuth } from './contexts/AuthContext.jsx';
  
function App() {

  let { isAuthenticated } = useAuth();

  return (
    <div>
      <Header/>
      <div>
      {isAuthenticated ? <><Logoff/><TodosPage/></> : <Logon/>}
      </div>
    </div>
  );
}

export default App
