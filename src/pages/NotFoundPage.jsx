import { Link } from 'react-router';


export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
        <Link to="/">Return to Home</Link>
        <Link to="/about">Return to About</Link>
        <Link to="/todos">Return to Todo List</Link>
        <Link to="/profile">Return to Profile</Link>
    </div>
  );
}