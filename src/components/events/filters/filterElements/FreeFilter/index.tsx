// src/components/events/filters/filterElements/FreeFilter/index.tsx

"use client";

import styles from "./styles.module.css";
import Text from "@/components/common/Text";

export default function FreeFilter({
  checked,
  setChecked,
  label = "무료만 보기",
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label className={styles.toggleWrapper}>
      <Text typography="label2_m_16" color="neutral-30">
        {label}
      </Text>
      <div
        className={`${styles.toggle} ${checked ? styles.active : ""}`}
        onClick={() => setChecked(!checked)}
      >
        <div className={styles.circle} />
      </div>
    </label>
  );
}
