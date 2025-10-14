// src/components/events/filters/views/MentoringFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import styles from "./styles.module.css";
import { usePageFilters } from "../../filters/hooks/usePageFilters";
import FreeFilter from "../filterElements/FreeFilter";

export default function MentoringFilterView() {
  const {
    tempOnOfflineFilter,
    setTempOnOfflineFilter,
    tempFreeFilter,
    setTempFreeFilter,
  } = usePageFilters({
    pageId: "mentoring",
  });
  return (
    <div className={styles.mentoringFilterView}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      <FreeFilter checked={tempFreeFilter} setChecked={setTempFreeFilter} />
    </div>
  );
}
