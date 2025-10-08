// src/components/events/filters/FilterModal/index.tsx

"use client";

import { ReactNode } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import ResetIcon from "@/assets/svg/resetIcon.svg";

interface FilterModalProps {
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  children: ReactNode;
  className?: string;
}

export default function FilterModal({
  onClose,
  onApply,
  onReset,
  children,
  className,
}: FilterModalProps) {
  return (
    <div className={`${styles.backdrop} ${className || ""}`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>필터 설정하기</h2>
          <button onClick={onReset} className={styles.resetButton}>
            <Image src={ResetIcon} alt="Reset Icon" />
            <span>필터 초기화</span>
          </button>
        </div>

        <div className={styles.content}>{children}</div>

        <div className={styles.footer}>
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button onClick={onApply} className={styles.applyButton}>
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
