import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from '../styles/HomePage.module.css';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos', {replace: true});
    } else {
      navigate('/login', {replace: true});
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.homePageDisplay}>
      <p>Redirecting...</p>
    </div>
  );
}

export default HomePage;