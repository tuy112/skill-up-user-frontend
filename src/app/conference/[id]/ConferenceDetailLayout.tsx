// src/app/conference/[id]/ConferenceDetailLayout.tsx

import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";

export default function ConferenceDetailLayout() {
  return (
    <div className={styles.conferenceDetailLayout}>
      <StickyApplySection />
    </div>
  );
}
