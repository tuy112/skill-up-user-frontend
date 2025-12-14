// src/components/common/IconButton/index.tsx

import clsx from "clsx";
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
      className={clsx(
        styles.iconButton,
        className,
        variant && styles[variant],
        size && styles[size],
        disabled && styles.disabled
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
