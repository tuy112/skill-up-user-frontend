// src/components/common/Dropdown/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import ChevronDownIcon from "@/assets/svg/chevronDownIcon.svg";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (value: DropdownOption) => void;
  buttonLabel?: string;
  className?: string;
}

export default function Dropdown({
  options,
  selected,
  onSelect,
  buttonLabel,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setIsOpen(false);
  };

  // 외부 클릭 시 닫힘
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`${styles.dropdown} ${className || ""}`} ref={dropdownRef}>
      <button className={styles.dropdownButton} onClick={toggleOpen}>
        <span>{buttonLabel || selected.label}</span>
        <Image src={ChevronDownIcon} alt="chevron down" />
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`${styles.dropdownItem} ${
                opt.value === selected.value ? styles.active : ""
              }`}
              onClick={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
