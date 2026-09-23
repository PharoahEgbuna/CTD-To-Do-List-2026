import { Link } from 'react-router';
import styles from '../styles/NotFoundPage.module.css';


export default function NotFoundPage() {
  return (
    <div className={styles.NotFoundPageDisplay}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <section>
        <div>
          <h2>Navigate App</h2>
          <p>Use the links below to navigate to different pages:</p>
          <article>
            <b><Link to="/" className={styles.LinkDisplay}>Return to Home</Link></b>
          </article>
          <article>
            <b><Link to="/about"  className={styles.LinkDisplay}>Go to About</Link></b>
          </article>
          <article>
            <b><Link to="/login"  className={styles.LinkDisplay}>Go to Login</Link></b>
          </article>
          <article>
            <b><Link to="/profile"  className={styles.LinkDisplay}>Go to Profile</Link></b>
          </article>
        </div>
      </section>
    </div>
  );
}