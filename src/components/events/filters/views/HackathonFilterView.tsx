// src/components/events/filters/views/HackathonFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import { usePageFilters } from "../../filters/hooks/usePageFilters";
import DateRangeFilter from "../filterElements/DateRangeFilter";
import Flex from "@/components/common/Flex";

export default function HackathonFilterView() {
  const {
    tempOnOfflineFilter,
    setTempOnOfflineFilter,
    tempStartDate,
    setTempStartDate,
    tempEndDate,
    setTempEndDate,
  } = usePageFilters({
    pageId: "hackathon",
  });
  return (
    <Flex direction="column" gap={1.5}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      <DateRangeFilter
        onSelectStartDate={setTempStartDate}
        onSelectEndDate={setTempEndDate}
        selectedStartDate={tempStartDate}
        selectedEndDate={tempEndDate}
      />
    </Flex>
  );
}
