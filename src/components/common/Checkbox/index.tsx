// src/components/common/Checkbox/index.tsx

"use client";
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface CheckboxProps {
  size?: "small" | "middle" | "large";
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export default function Checkbox({
  size = "large",
  checked,
  onChange,
  disabled = false,
  id,
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      className={clsx(styles.checkboxWrapper, disabled && styles.disabled)}
      htmlFor={id}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      <span className={clsx(styles.checkboxCustom, styles[size])}>
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <path
              d="M18.6667 0H2.33333C1.05 0 0 1.05 0 2.33333V18.6667C0 19.95 1.05 21 2.33333 21H18.6667C19.95 21 21 19.95 21 18.6667V2.33333C21 1.05 19.95 0 18.6667 0ZM8.995 15.505C8.88707 15.6132 8.75886 15.699 8.61773 15.7575C8.47659 15.8161 8.3253 15.8462 8.1725 15.8462C8.0197 15.8462 7.86841 15.8161 7.72727 15.7575C7.58614 15.699 7.45793 15.6132 7.35 15.505L3.16167 11.3167C3.05365 11.2087 2.96797 11.0804 2.90952 10.9393C2.85106 10.7982 2.82098 10.6469 2.82098 10.4942C2.82098 10.3414 2.85106 10.1902 2.90952 10.049C2.96797 9.90791 3.05365 9.77968 3.16167 9.67167C3.26968 9.56365 3.39791 9.47797 3.53903 9.41952C3.68016 9.36106 3.83141 9.33098 3.98417 9.33098C4.13692 9.33098 4.28818 9.36106 4.4293 9.41952C4.57042 9.47797 4.69865 9.56365 4.80667 9.67167L8.16667 13.0317L16.1933 5.005C16.4115 4.78686 16.7073 4.66431 17.0158 4.66431C17.3243 4.66431 17.6202 4.78686 17.8383 5.005C18.0565 5.22314 18.179 5.519 18.179 5.8275C18.179 6.136 18.0565 6.43186 17.8383 6.65L8.995 15.505Z"
              fill="#5A23FF"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <rect
              x="0.75"
              y="0.75"
              width="19.5"
              height="19.5"
              rx="1.58333"
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
