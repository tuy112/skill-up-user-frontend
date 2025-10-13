// src/components/events/filters/FilterButton/index.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import FilterModal from "../FilterModal";
import styles from "./styles.module.css";
import { ReactNode } from "react";
import Image from "next/image";
import FilterIcon from "@/assets/svg/filterIcon.svg";

export interface FilterButtonProps {
  className?: string;
  children: ReactNode;
}

export default function FilterButton({
  className,
  children,
}: FilterButtonProps) {
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleClick = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!filterButtonRef.current?.contains(e.target as Node)) {
        setIsFilterModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.filterButtonContainer} ${className || ""}`}
      ref={filterButtonRef}
    >
      <button className={styles.filterButton} onClick={handleClick}>
        <Image src={FilterIcon} alt="filter" />
        <span>필터</span>
      </button>
      {isFilterModalOpen && (
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          onApply={() => {}}
          onReset={() => {}}
          className={styles.filterModal}
        >
          {children}
        </FilterModal>
      )}
    </div>
  );
}
