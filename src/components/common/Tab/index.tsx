import { useState } from "react";
import styles from "./style.module.css";

export interface TabMenuProps {
  tabs: string[];
  defaultIndex?: number;
  onChange?: (selected: string) => void;
  theme?: "light" | "dark";
}

export default function TabMenu({
  tabs,
  defaultIndex = 0,
  onChange,
  theme = "light",
}: TabMenuProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onChange?.(tabs[index]);
  };

  return (
    <div
      className={`${styles.tabWrap} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.tabMenu}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`${styles.tabItem} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => handleSelect(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}