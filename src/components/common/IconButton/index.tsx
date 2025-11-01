// src/components/common/IconButton/index.tsx

import styles from "./styles.module.css";

interface IconButtonProps {
  variant: "primary" | "secondary" | "disabled" | "opacity";
  size?: "small" | "medium" | "large" | "extraLarge";
  disabled?: boolean;
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function IconButton({
  variant,
  size,
  disabled,
  icon,
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      className={`${styles.iconButton} ${className || ""} ${
        variant === "primary" ? styles.primary : ""
      } ${variant === "secondary" ? styles.secondary : ""} ${
        variant === "disabled" ? styles.disabled : ""
      } ${variant === "opacity" ? styles.opacity : ""}
      } ${size === "small" ? styles.small : ""} ${
        size === "medium" ? styles.medium : ""
      } ${size === "large" ? styles.large : ""} ${
        size === "extraLarge" ? styles.extraLarge : ""
      } ${disabled ? styles.disabled : ""}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
