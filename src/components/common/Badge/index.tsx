// src/components/common/Badge/index.tsx

import styles from "./styles.module.css";

interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary";
}

// TODO : 추후 variant 변경 예정 (디자인 요청 상태)
export default function Badge({ label, variant = "primary" }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${styles[variant]}`}>
      <span>{label}</span>
    </div>
  );
}
