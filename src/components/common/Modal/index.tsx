// src/components/common/Modal/index.tsx

/* 
  작성자 : 김은혜
  작성일 : 2025-09-22
  최종 수정일 : 2025-09-22
*/
"use client";

import { useEffect } from "react";
import styles from "./style.module.css";

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, toggle, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={toggle}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
