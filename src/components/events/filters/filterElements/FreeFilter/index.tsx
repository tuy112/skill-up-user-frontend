// src/components/events/filters/filterElements/FreeFilter/index.tsx

"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function FreeFilter() {
  const [checked, setChecked] = useState(false);
  return (
    <label className={styles.toggleWrapper}>
      <span className={styles.labelText}>무료</span>
      <div
        className={`${styles.toggle} ${checked ? styles.active : ""}`}
        onClick={() => setChecked(!checked)}
      >
        <div className={styles.circle} />
      </div>
    </label>
  );
}
