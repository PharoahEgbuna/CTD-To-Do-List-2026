import { Link } from 'react-router';


export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <section>
        <div>
          <h2>Navigate App</h2>
          <p>Use the links below to navigate to different pages:</p>
          <article>
            <b><Link to="/">Return to Home</Link></b>
          </article>
          <article>
            <b><Link to="/login">Go to Login</Link></b>
          </article>
          <article>
            <b><Link to="/profile">Go to Profile</Link></b>
          </article>
        </div>
      </section>
    </div>
  );
}