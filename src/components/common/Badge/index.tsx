// src/components/common/Badge/index.tsx

import styles from "./styles.module.css";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "opacity";
}

export default function Badge({ label, variant = "primary" }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[variant]}`}>
      <span>{label}</span>
    </div>
  );
}
