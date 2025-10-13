// src/app/conference/ConferencePageLayout.tsx

"use client";

import EventHeader from "@/components/events/EventHeader";
import EventCard from "@/components/events/EventCard";
import styles from "./styles.module.css";
import SortDropdown from "@/components/events/sorting/SortDropdown";
import FilterButton from "@/components/events/filters/FilterButton";
import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { eventListMock } from "@/mocks/eventListMock";
import { useAtom } from "jotai";
import {
  roleFilterAtom,
  onOfflineFilterAtom,
  freeFilterAtom,
  sortOptionAtom,
  tempOnOfflineFilterAtom,
  tempFreeFilterAtom,
} from "@/components/events/filters/atoms/filterAtoms";
import { DropdownOption } from "@/components/common/Dropdown";

import EventEmpty from "@/components/events/EventEmpty";

const sortOptions: DropdownOption[] = [
  { label: "인기순", value: "popular" },
  { label: "최신등록순", value: "recent" },
  { label: "모집마감순", value: "deadline" },
];

export default function ConferencePageLayout({
  eventList,
}: {
  eventList: typeof eventListMock;
}) {
  const [selectedRoles, setSelectedRoles] = useAtom(roleFilterAtom);
  const [, setOnOfflineFilter] = useAtom(onOfflineFilterAtom);
  const [, setFreeFilter] = useAtom(freeFilterAtom);
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);
  const [tempOnOfflineFilter, setTempOnOfflineFilter] = useAtom(
    tempOnOfflineFilterAtom
  );
  const [tempFreeFilter, setTempFreeFilter] = useAtom(tempFreeFilterAtom);

  const handleApply = () => {
    setOnOfflineFilter(tempOnOfflineFilter);
    setFreeFilter(tempFreeFilter);
  };

  const handleReset = () => {
    setOnOfflineFilter("");
    setFreeFilter(false);
    setTempOnOfflineFilter("");
    setTempFreeFilter(false);
  };

  return (
    <div className={styles.conferencePageLayout}>
      <div className={styles.pageHeader}>
        <EventHeader title="컨퍼런스 · 세미나" count={10} />
        <div className={styles.eventHeaderFilterSortContainer}>
          <RoleSelector selected={selectedRoles} onSelect={setSelectedRoles} />
          <div className={styles.filterButtonContainer}>
            <FilterButton onApply={handleApply} onReset={handleReset}>
              <ConferenceFilterView />
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
        {eventList.length !== 0 ? (
          <EventEmpty title="컨퍼런스 · 세미나" url="/conference/create" />
        ) : (
          <div className={styles.eventCardList}>
            {eventList.map((item) => (
              // 목업 데이터
              <EventCard
                key={item.id}
                title={item.title}
                date={item.date}
                place={item.place}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
