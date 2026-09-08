import Header from './shared/Header.jsx';
import TodosPage from './features/Todos/TodosPage.jsx';
import Logon from './features/Logon.jsx';
import './App.css'
// import { useAuth } from './contexts/AuthContext.jsx';
import HomePage from './pages/HomePage.jsx';
import {Routes, Route}from 'react-router';
  
function App() {

  // const { isAuthenticated } = useAuth();

  return (
    <>
      <Header/>
      <Routes>
        {/* {isAuthenticated ? <TodosPage/> : <Logon/>} */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<Logon/>} />
        <Route path="/login" element={<Logon/>} />
        <Route path="/todos" element={<TodosPage/>} />
        <Route path="*" element={<Logon/>} />

      </Routes>
    </>
  );
}

export default App;
