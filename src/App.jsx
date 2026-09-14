import './App.css'
import {Routes, Route}from 'react-router';
import Header from './shared/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import TodosPage from './pages/TodosPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RequireAuth from './components/RequireAuth.jsx';
  
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/todos" element={
          <RequireAuth>
            <TodosPage/>
          </RequireAuth>
        } />
        <Route path="/profile" element={
          <RequireAuth>
            <ProfilePage/>
          </RequireAuth>
        } />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}

export default App;