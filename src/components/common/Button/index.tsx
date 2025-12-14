// src/components/common/Button/index.tsx

import clsx from "clsx";
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
      className={clsx(
        styles.button,
        className,
        variant && styles[variant],
        size && styles[size],
        disabled && styles.disabled,
        block && styles.block
      )}
      onClick={onClick}
      disabled={disabled}
      style={backgroundStyle}
    >
      {children && <span>{children}</span>}
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
}
