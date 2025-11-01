// src/components/common/MultiSelectButtonGroup/index.tsx

import styles from "./styles.module.css";
import Text from "../Text";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectButtonGroupProps {
  options: Option[];
  selectedValues: string[];
  onSelect: (selected: string[]) => void;
}

export const MultiSelectButtonGroup = ({
  options,
  selectedValues,
  onSelect,
}: MultiSelectButtonGroupProps) => {
  const toggleSelect = (value: string) => {
    const isSelected = selectedValues.includes(value);
    const newSelected = isSelected
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelect(newSelected);
  };

  return (
    <div className={styles.multiSelectButtonGroup}>
      {options.map(({ label, value }) => {
        const isSelected = selectedValues.includes(value);
        return (
          <button
            key={value}
            onClick={() => toggleSelect(value)}
            className={`${styles.multiSelectButtonGroupItemButton} ${
              isSelected ? styles.active : ""
            }`}
          >
            <Text
              typography="label3_m_14"
              color={isSelected ? "primary-strong" : "neutral-30"}
            >
              {label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};
