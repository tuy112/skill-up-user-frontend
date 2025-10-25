import { FaRegBookmark } from "react-icons/fa";
import styles from "./style.module.css";

interface BookmarkButtonProps {
  filled?: boolean;
  opacity?: number;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function BookmarkButton({
  filled = false,
  opacity = 0.6,
  disabled = false,
  onClick,
  className,
}: BookmarkButtonProps) {
  return (
    <button
      className={`${styles.bookmarkButton} ${
        filled ? styles.filled : ""
      } ${disabled ? styles.disabled : ""} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
    >
      <FaRegBookmark className={styles.icon} />
    </button>
  );
}