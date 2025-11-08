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
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";

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
    <Flex direction="column" align="flex-start" gap={1.25} className={styles.container}>
      <Flex direction="column" gap={1.5} style={{ width: "100%" }}>
        <EventHeader title="네트워킹 · 멘토링" count={10} />
        <Flex align="center" justify="space-between">
          <RoleSelector selected={selectedRoles} onSelect={setSelectedRoles} />
          <Flex align="center" gap={0.5}>
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
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
        {eventList.length === 0 ? (
          <>
            <EventEmpty title="컨퍼런스 · 세미나" url="/conference/create" />
            <Flex direction="column" gap={1}>
              <Flex align="center" justify="space-between">
                <Text typography="head3_m_24" color="black" as="h3">
                  이런 행사는 어떠세요?
                </Text>
                <Button
                  variant="textOnly"
                  icon={<ChevronRightIcon />}
                  size="medium"
                >
                  IT 행사 더보기
                </Button>
              </Flex>
              <div className={styles.cardList}>
                {eventList.map((item) => (
                  // 목업 데이터
                  <EventCard key={item.id} size="medium" event={item} />
                ))}
              </div>
            </Flex>
          </>
        ) : (
          <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
            <div className={styles.cardList}>
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
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
