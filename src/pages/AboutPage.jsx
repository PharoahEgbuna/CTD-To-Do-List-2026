import styles from '../styles/AboutPage.module.css';

export default function AboutPage() {
    return (
        <div className={styles.aboutPageDisplay}>
            <h1>About:</h1>
            <p>Here I've created a todo list application using Javascript, Vite, React, and React-Router.</p>
            <p>This application allows users to sign in and manage a list of tasks via the Todos page.</p>
            <p>Tasks can be added and marked/unmarked as complete.</p>
            <p>By clicking a task, users can update the tasks' description or delete the task from the list.</p>
            <p>The list can be filtered using the search bar and sorted alphabetically, by creation date, or by completion status.</p>
            <p>On the Profile page users can see their todo statistics; the number of active and complete tasks, and their completion rate based on those values.</p>
        </div>
    );
}