// src/app/mentoring/MentoringPageLayout.tsx

"use client";

import EventHeader from "@/components/events/EventHeader";
import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import MentoringFilterView from "@/components/events/filters/views/MentoringFilterView";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { Event } from "@/types/event/event";
import Button from "@/components/common/Button";

import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { DropdownOption } from "@/components/common/Dropdown";

import EventEmpty from "@/components/events/EventEmpty";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

const sortOptions: DropdownOption[] = [
  { label: "인기순", value: "popular" },
  { label: "최신등록순", value: "recent" },
  { label: "모집마감순", value: "deadline" },
];

const goToPageOptions: DropdownOption[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

export default function MentoringPageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  const {
    selectedRoles,
    setSelectedRoles,
    onOfflineFilter,
    setOnOfflineFilter,
    freeFilter,
    setFreeFilter,
    sortOption,
    setSortOption,
    setTempOnOfflineFilter,
    setTempFreeFilter,
    handleApply,
    handleReset,
  } = usePageFilters({ pageId: "mentoring" });

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.mentoringPageLayout}>
      <div className={styles.pageHeader}>
        <EventHeader title="네트워킹 · 멘토링" count={10} />
        <div className={styles.eventHeaderFilterSortContainer}>
          <RoleSelector selected={selectedRoles} onSelect={setSelectedRoles} />
          <div className={styles.filterButtonContainer}>
            <FilterBadges
              onOfflineFilter={onOfflineFilter}
              freeFilter={freeFilter}
              onClearOnOfflineFilter={() => {
                setOnOfflineFilter("");
                setTempOnOfflineFilter("");
              }}
              onClearFreeFilter={() => {
                setFreeFilter(false);
                setTempFreeFilter(false);
              }}
            />
            <FilterButton onApply={handleApply} onReset={handleReset}>
              <MentoringFilterView />
            </FilterButton>
            <SortDropdown
              selected={
                sortOptions.find((option) => option.value === sortOption) ||
                sortOptions[0]
              }
              setSelected={(option) => setSortOption(option.value)}
              options={sortOptions}
            />
          </div>
        </div>
      </div>
      <div className={styles.eventCardListContainer}>
        {eventList.length === 0 ? (
          <>
            <EventEmpty title="컨퍼런스 · 세미나" url="/conference/create" />
            <div className={styles.eventRecommendCardList}>
              <div className={styles.eventRecommendCardListTitle}>
                <h3>이런 행사는 어떠세요?</h3>
                <Button
                  variant="textOnly"
                  icon={<ChevronRightIcon />}
                  size="medium"
                >
                  IT 행사 더보기
                </Button>
              </div>
              <div className={styles.eventCardList}>
                {eventList.map((item) => (
                  // 목업 데이터
                  <EventCard key={item.id} size="medium" event={item} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.eventCardListContainer}>
            <div className={styles.eventCardList}>
              {eventList.map((item) => (
                // 목업 데이터
                <EventCard key={item.id} size="medium" event={item} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              options={goToPageOptions}
              selected={goToPageOptions[0]}
              onSelect={(option) => setCurrentPage(parseInt(option.value))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
