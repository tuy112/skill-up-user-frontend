// src/components/common/Dropdown/index.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import Text from "../Text";

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
  block?: boolean;
  spaceBetween?: boolean;
}

export default function Dropdown({
  options,
  selected,
  onSelect,
  buttonLabel,
  className,
  block,
  spaceBetween,
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
    <div
      className={clsx(styles.dropdown, className, block && styles.block)}
      ref={dropdownRef}
    >
      <button
        className={clsx(
          styles.dropdownButton,
          spaceBetween && styles.spaceBetween
        )}
        onClick={toggleOpen}
      >
        <Text typography="body1_r_16" color="neutral-20">
          {buttonLabel || selected.label}
        </Text>
        <ChevronDownIcon />
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={clsx(
                styles.dropdownItem,
                opt.value === selected.value && styles.active
              )}
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
