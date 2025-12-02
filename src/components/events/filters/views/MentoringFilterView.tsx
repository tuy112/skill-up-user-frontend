// src/components/events/filters/views/MentoringFilterView.tsx

"use client";

import OnOfflineFilter from "../filterElements/OnOfflineFilter";
import { usePageFilters } from "../../filters/hooks/usePageFilters";
import FreeFilter from "../filterElements/FreeFilter";
import Flex from "@/components/common/Flex";

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
    <Flex direction="column" gap={1.5}>
      <OnOfflineFilter
        onSelect={setTempOnOfflineFilter}
        selected={tempOnOfflineFilter}
      />
      <FreeFilter checked={tempFreeFilter} setChecked={setTempFreeFilter} />
    </Flex>
  );
}
