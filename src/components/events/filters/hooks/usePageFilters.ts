// src/components/events/filters/hooks/usePageFilters.ts

import { useAtom } from "jotai";
import { pageFilterAtomsMap, PageId } from "../atoms/pageFilterAtoms";
import { EVENT_SORT_OPTIONS } from "@/constants/event";
import { useUrlSync } from "./useUrlSync";

interface UsePageFiltersProps {
  pageId: PageId;
}

export const usePageFilters = ({ pageId }: UsePageFiltersProps) => {
  const atoms = pageFilterAtomsMap[pageId];

  // Atom 상태 관리
  const [selectedRoles, setSelectedRoles] = useAtom(atoms.roleFilterAtom);
  const [onOfflineFilter, setOnOfflineFilter] = useAtom(
    atoms.onOfflineFilterAtom
  );
  const [freeFilter, setFreeFilter] = useAtom(atoms.freeFilterAtom);
  const [sortOption, setSortOption] = useAtom(atoms.sortOptionAtom);
  const [startDate, setStartDate] = useAtom(atoms.startDateAtom);
  const [endDate, setEndDate] = useAtom(atoms.endDateAtom);
  const [tempOnOfflineFilter, setTempOnOfflineFilter] = useAtom(
    atoms.tempOnOfflineFilterAtom
  );
  const [tempFreeFilter, setTempFreeFilter] = useAtom(atoms.tempFreeFilterAtom);
  const [tempStartDate, setTempStartDate] = useAtom(atoms.tempStartDateAtom);
  const [tempEndDate, setTempEndDate] = useAtom(atoms.tempEndDateAtom);
  const [currentPage, setCurrentPage] = useAtom(atoms.currentPageAtom);

  // URL 동기화
  useUrlSync(
    {
      selectedRoles,
      onOfflineFilter,
      freeFilter,
      sortOption,
      startDate,
      endDate,
      currentPage,
    },
    {
      setSelectedRoles,
      setOnOfflineFilter,
      setFreeFilter,
      setSortOption,
      setStartDate,
      setEndDate,
      setCurrentPage,
      setTempOnOfflineFilter,
      setTempFreeFilter,
      setTempStartDate,
      setTempEndDate,
    },
    pageId
  );

  // 필터 적용 함수
  const handleApply = () => {
    setOnOfflineFilter(tempOnOfflineFilter);
    setFreeFilter(tempFreeFilter);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setCurrentPage(1); // 필터 적용 시 첫 페이지로
  };

  // 필터 초기화 함수
  const handleReset = () => {
    // 실제 필터 상태 초기화
    setOnOfflineFilter("");
    setFreeFilter(false);
    setStartDate(undefined);
    setEndDate(undefined);

    // 임시 필터 상태도 초기화
    setTempOnOfflineFilter("");
    setTempFreeFilter(false);
    setTempStartDate(undefined);
    setTempEndDate(undefined);

    setCurrentPage(1); // 필터 초기화 시 첫 페이지로
  };

  // 역할 필터 초기화 함수
  const resetRoleFilter = () => {
    setSelectedRoles(["전체"]);
    setCurrentPage(1); // 역할 필터 초기화 시 첫 페이지로
  };

  // 정렬 옵션 초기화 함수
  const resetSortOption = () => {
    setSortOption(EVENT_SORT_OPTIONS.POPULARITY);
    setCurrentPage(1); // 정렬 옵션 초기화 시 첫 페이지로
  };

  // 모든 필터 초기화 함수
  const resetAllFilters = () => {
    handleReset();
    resetRoleFilter();
    resetSortOption();
    setStartDate(undefined);
    setEndDate(undefined);
    setTempStartDate(undefined);
    setTempEndDate(undefined);
    setCurrentPage(1); // 모든 필터 초기화 시 첫 페이지로
  };

  return {
    // 상태
    selectedRoles,
    onOfflineFilter,
    freeFilter,
    sortOption,
    tempOnOfflineFilter,
    tempFreeFilter,
    startDate,
    endDate,
    tempStartDate,
    tempEndDate,
    // 액션
    setSelectedRoles,
    setOnOfflineFilter,
    setFreeFilter,
    setSortOption,
    setTempOnOfflineFilter,
    setTempFreeFilter,
    setStartDate,
    setEndDate,
    setTempStartDate,
    setTempEndDate,
    // 핸들러
    handleApply,
    handleReset,
    resetRoleFilter,
    resetSortOption,
    resetAllFilters,
  };
};
