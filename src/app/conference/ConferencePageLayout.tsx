// src/app/conference/ConferencePageLayout.tsx

import EventHeader from "@/components/events/EventHeader";
import EventCard from "@/components/events/EventCard";
import styles from "./styles.module.css";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";

export default function ConferencePageLayout() {
  return (
    <div className={styles.conferencePageLayout}>
      <div className={styles.pageHeader}>
        <EventHeader title="컨퍼런스 · 세미나" count={10} />
        <div className={styles.eventHeaderFilterSortContainer}>
          <FilterButton>
            <div>asdfasdf</div>
          </FilterButton>
          <SortDropdown />
        </div>
      </div>
      <div className={styles.eventCardList}>
        {[1, 2, 3, 4, 5].map((item) => (
          // 목업 데이터
          <EventCard
            key={item}
            title="요즘 핫한 행사! 요즘 핫한 행사! 요즘 핫한 행사! 요즘 핫한 행사! 요즘 핫한 행사! 요즘 핫한 행사!요즘 핫한 행사! 요즘 핫한 행사!"
            date="2025.01.01 - 2025.01.01"
            place="서울특별시 강남구 테헤란로 22길"
            price="0원"
            category="카테고리"
          />
        ))}
      </div>
    </div>
  );
}
