// src/components/common/Button/index.tsx

import styles from "./styles.module.css";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large" | "extraLarge";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant,
  size,
  disabled,
  className,
  onClick,
  icon,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className || ""} ${
        variant === "secondary" ? styles.secondary : ""
      } ${variant === "tertiary" ? styles.tertiary : ""} ${
        variant === "primary" ? styles.primary : ""
      } ${size === "small" ? styles.small : ""} ${
        size === "medium" ? styles.medium : ""
      } ${size === "large" ? styles.large : ""} ${
        size === "extraLarge" ? styles.extraLarge : ""
      } ${disabled ? styles.disabled : ""}
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {children && <span>{children}</span>}
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
}
