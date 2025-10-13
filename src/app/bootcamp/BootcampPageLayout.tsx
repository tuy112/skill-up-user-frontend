// src/app/bootcamp/BootcampPageLayout.tsx

"use client";

import { useState } from "react";
import EventHeader from "@/components/events/EventHeader";
import EventCard from "@/components/events/EventCard";
import styles from "./styles.module.css";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { RoleOption } from "@/components/events/filters/types/role";

export default function BootcampPageLayout() {
  const [selectedRoles, setSelectedRoles] = useState<RoleOption[]>(["전체"]);
  return (
    <div className={styles.bootcampPageLayout}>
      <div className={styles.pageHeader}>
        <EventHeader title="부트캠프" count={10} />
        <div className={styles.eventHeaderFilterSortContainer}>
          <RoleSelector selected={selectedRoles} onSelect={setSelectedRoles} />
          <div className={styles.filterButtonContainer}>
            <FilterButton>
              <ConferenceFilterView />
            </FilterButton>
            <SortDropdown />
          </div>
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
