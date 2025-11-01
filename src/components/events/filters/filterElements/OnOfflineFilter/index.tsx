// src/components/events/filters/filterElements/OnOfflineFilter/index.tsx

import styles from "./styles.module.css";
import Text from "@/components/common/Text";

interface OnOfflineFilterProps {
  onSelect: (value: string) => void;
  selected: string;
}

export default function OnOfflineFilter({
  onSelect,
  selected,
}: OnOfflineFilterProps) {
  return (
    <div className={styles.onOfflineFilter}>
      <Text typography="label2_m_16" color="neutral-30">
        온 · 오프라인
      </Text>
      <div className={styles.onOfflineFilterButtonContainer}>
        {/* TODO: 추후 버튼 컴포넌트로 변경 */}
        <button
          className={`${styles.onOfflineFilterButton} ${
            selected === "all" ? styles.active : ""
          }`}
          onClick={() => onSelect("all")}
        >
          <span>전체</span>
        </button>
        <button
          className={`${styles.onOfflineFilterButton} ${
            selected === "online" ? styles.active : ""
          }`}
          onClick={() => onSelect("online")}
        >
          <span>온라인</span>
        </button>
        <button
          className={`${styles.onOfflineFilterButton} ${
            selected === "offline" ? styles.active : ""
          }`}
          onClick={() => onSelect("offline")}
        >
          <span>오프라인</span>
        </button>
      </div>
    </div>
  );
}
