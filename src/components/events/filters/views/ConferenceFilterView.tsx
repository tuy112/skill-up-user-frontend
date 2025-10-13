// src/components/events/filters/views/ConferenceFilterView.tsx

"use client";

import { useState } from "react";
import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import FreeFilter from "../filterElements/FreeFilter";
import styles from "./styles.module.css";

export default function ConferenceFilterView() {
  const [onOfflineFilter, setOnOfflineFilter] = useState<string>("");
  return (
    <div className={styles.conferenceFilterView}>
      <OnOfflineFilter
        onSelect={setOnOfflineFilter}
        selected={onOfflineFilter}
      />
      <FreeFilter />
    </div>
  );
}
