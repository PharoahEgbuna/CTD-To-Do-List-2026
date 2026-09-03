import Header from './shared/Header.jsx';
import TodosPage from './features/Todos/TodosPage.jsx';
import Logon from './features/Logon.jsx';
import './App.css'
import { useAuth } from './contexts/AuthContext.jsx';
  
function App() {

  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header/>
      <div>
      {isAuthenticated ? <TodosPage/> : <Logon/>}
      </div>
    </div>
  );
}

export default App
