// src/app/bootcamp/BootcampPageLayout.tsx

"use client";

import EventHeader from "@/components/events/EventHeader";
import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import BootcampFilterView from "@/components/events/filters/views/BootcampFilterView";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { DropdownOption } from "@/components/common/Dropdown";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import FilterBadges from "@/components/events/filters/FilterBadges";
import Pagination from "@/components/common/Pagination";
import EventEmpty from "@/components/events/EventEmpty";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Button from "@/components/common/Button";
import { Event } from "@/types/event/event";
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

export default function BootcampPageLayout({
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
  } = usePageFilters({ pageId: "bootcamp" });

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className={styles.bootcampPageLayout}>
      <div className={styles.pageHeader}>
        <EventHeader title="부트캠프" count={10} />
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
              <BootcampFilterView />
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
        {eventList?.length === 0 ? (
          <>
            <EventEmpty title="부트캠프" url="/bootcamp/create" />
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
                {eventList?.map((item) => (
                  // 목업 데이터
                  <EventCard key={item.id} size="medium" event={item} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.eventCardListContainer}>
            <div className={styles.eventCardList}>
              {eventList?.map((item) => (
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
