// src/components/common/Radio/index.tsx

"use client";
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface RadioProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export default function Radio({
  value,
  checked,
  onChange,
  disabled = false,
  id,
  name,
}: RadioProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <label
      className={clsx(styles.radioWrapper, disabled && styles.disabled)}
      htmlFor={id}
    >
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.radioInput}
      />
      <span className={styles.radioCustom}>
        {checked ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11.25"
              stroke="#5A23FF"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="6" fill="#5A23FF" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11.25"
              stroke="#C6C6C6"
              strokeWidth="1.5"
              fill="white"
            />
          </svg>
        )}
      </span>
    </label>
  );
}
