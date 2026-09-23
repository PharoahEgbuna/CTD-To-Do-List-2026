import styles from '../styles/TextInputWithLabel.module.css';

export default function TextInputWithLabel ({
    elementId,
    labelText,
    onChange, 
    ref, 
    value,
}) {
    return (
        <>
            <label htmlFor={elementId} className={styles.TextInputLabel}>
                {labelText}
            </label>
            <input
                type="text"
                id={elementId}
                ref={ref}
                value={value}
                onChange={onChange}
                className={styles.TextInputDisplay}
                maxLength={50}
            />
        </>
    );
};