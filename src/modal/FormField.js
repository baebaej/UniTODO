import React from "react";
import styles from "./RegisterModal.module.css";

export function FormField({ label, type, id, placeholder, helperText }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {helperText && <span className={styles.helperText}>{helperText}</span>}
      <input
        type={type}
        id={id}
        className={styles.input}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
  );
}
