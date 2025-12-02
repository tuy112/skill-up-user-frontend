// src/components/common/Button/index.tsx

import styles from "./styles.module.css";

interface ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "outlined"
    | "textOnly"
    | "iconOpacity";
  size?: "small" | "medium" | "large" | "extraLarge";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  opacity?: number;
  block?: boolean;
}

export default function Button({
  children,
  variant,
  size,
  disabled,
  className,
  onClick,
  icon,
  opacity,
  block,
}: ButtonProps) {
  const backgroundStyle =
    opacity !== undefined
      ? { backgroundColor: `rgba(0, 0, 0, ${opacity})` }
      : undefined;

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
      } ${variant === "disabled" ? styles.disabled : ""} ${
        variant === "outlined" ? styles.outlined : ""
      } ${variant === "textOnly" ? styles.textOnly : ""}
      } ${variant === "iconOpacity" ? styles.iconOpacity : ""}
      } ${disabled ? styles.disabled : ""}
      ${block ? styles.block : ""}
        `}
      onClick={onClick}
      disabled={disabled}
      style={backgroundStyle}
    >
      {children && <span>{children}</span>}
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
}
