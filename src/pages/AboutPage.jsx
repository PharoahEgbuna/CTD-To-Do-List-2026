import styles from '../styles/AboutPage.module.css';

export default function AboutPage() {
    return (
        <div className={styles.aboutPageDisplay}>
            <h1>About:</h1>
            <p>Here I've created a todo list application using Javascript, Vite, React, and React-Router.</p>
            <p>This application allows users to sign in and manage a list of tasks via the Todos page.</p>
            <p>Tasks can be added and marked/unmarked as complete.</p>
            <p>Clicking a task allows users to update the tasks' text or delete the task entirely.</p>
            <p>Tasks can be filtered using the search bar or sorted alphabetically, by creation date, or by completion status.</p>
            <p>On the profile page users can see their todo statistics, showing the number of active and complete tasks, and their completion rate.</p>
        </div>
    );
}