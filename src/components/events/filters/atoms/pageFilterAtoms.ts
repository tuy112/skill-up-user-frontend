// src/components/events/filters/atoms/pageFilterAtoms.ts

import { RoleOption } from "@/components/events/filters/types/role";
import { atom } from "jotai";
import { EventSearchParams } from "@/types/event";
import { EVENT_SORT_OPTIONS, EventSortOption } from "@/constants/event";

// 기본 필터 상태 타입 정의
export interface PageFilterState {
  roleFilter: RoleOption[];
  onOfflineFilter: string;
  freeFilter: boolean;
  sortOption: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  tempOnOfflineFilter: string;
  tempFreeFilter: boolean;
  tempStartDate: Date | undefined;
  tempEndDate: Date | undefined;
}

// 페이지별 필터 상태를 관리하는 atom 생성 함수
export const createPageFilterAtoms = () => {
  return {
    roleFilterAtom: atom<RoleOption[]>(["전체"]),
    onOfflineFilterAtom: atom<string>(""),
    freeFilterAtom: atom<boolean>(false),
    sortOptionAtom: atom<EventSortOption>(EVENT_SORT_OPTIONS.POPULARITY),
    startDateAtom: atom<Date | undefined>(undefined),
    endDateAtom: atom<Date | undefined>(undefined),
    tempOnOfflineFilterAtom: atom<string>(""),
    tempFreeFilterAtom: atom<boolean>(false),
    tempStartDateAtom: atom<Date | undefined>(undefined),
    tempEndDateAtom: atom<Date | undefined>(undefined),
    currentPageAtom: atom<number>(1), // UI 페이지 (1부터 시작)
  };
};

// 페이지별 필터 상태 atom 인스턴스들
export const conferenceFilterAtoms = createPageFilterAtoms();
export const bootcampFilterAtoms = createPageFilterAtoms();
export const hackathonFilterAtoms = createPageFilterAtoms();
export const mentoringFilterAtoms = createPageFilterAtoms();
export const articleFilterAtoms = createPageFilterAtoms();
// 페이지별 atom 매핑 객체
export const pageFilterAtomsMap = {
  conference: conferenceFilterAtoms,
  bootcamp: bootcampFilterAtoms,
  hackathon: hackathonFilterAtoms,
  mentoring: mentoringFilterAtoms,
  article: articleFilterAtoms,
} as const;

// 페이지 ID 타입
export type PageId = keyof typeof pageFilterAtomsMap;

// 카테고리 매핑
export const PAGE_CATEGORY_MAP: Record<PageId, EventSearchParams["category"]> =
  {
    conference: "CONFERENCE_SEMINAR",
    bootcamp: "BOOTCAMP_CLUB",
    hackathon: "COMPETITION_HACKATHON",
    mentoring: "NETWORKING_MENTORING",
    article: "ARTICLE",
  };

// UI 역할명을 API 역할명으로 변환하는 맵
const ROLE_TO_API_MAP: Record<string, string> = {
  기획: "기획자",
  디자인: "디자이너",
  개발: "개발자",
  AI: "AI 개발자",
};

// UI 역할명을 API 역할명으로 변환하는 함수
const convertRolesToApi = (roles: RoleOption[]): string[] => {
  return roles
    .filter((role) => role !== "전체")
    .map((role) => ROLE_TO_API_MAP[role] || role);
};

// Jotai 필터 상태를 API params로 변환하는 derived atom 생성
export const createEventSearchParamsAtom = (pageId: PageId) => {
  const atoms = pageFilterAtomsMap[pageId];

  return atom<EventSearchParams>((get) => {
    const selectedRoles = get(atoms.roleFilterAtom);
    const onOfflineFilter = get(atoms.onOfflineFilterAtom);
    const freeFilter = get(atoms.freeFilterAtom);
    const sortOption = get(atoms.sortOptionAtom);
    const startDate = get(atoms.startDateAtom);
    const endDate = get(atoms.endDateAtom);
    const currentPage = get(atoms.currentPageAtom);

    const params: EventSearchParams = {
      category: PAGE_CATEGORY_MAP[pageId],
      sort: sortOption,
      page: currentPage - 1, // UI는 1부터, API는 0부터 시작
    };

    // 선택 필드들 - 값이 있을 때만 추가
    if (selectedRoles.length > 0 && !selectedRoles.includes("전체")) {
      params.targetRoles = convertRolesToApi(selectedRoles);
    }

    if (onOfflineFilter === "online") {
      params.isOnline = true;
    } else if (onOfflineFilter === "offline") {
      params.isOnline = false;
    }

    if (freeFilter) {
      params.isFree = true;
    }

    if (startDate) {
      params.startDate = startDate.toISOString().split("T")[0];
    }

    if (endDate) {
      params.endDate = endDate.toISOString().split("T")[0];
    }

    return params;
  });
};

// 페이지별 필터 상태를 초기화하는 함수
export const resetPageFilters = (
  atoms: ReturnType<typeof createPageFilterAtoms>
) => {
  return {
    roleFilter: atoms.roleFilterAtom.init,
    onOfflineFilter: atoms.onOfflineFilterAtom.init,
    freeFilter: atoms.freeFilterAtom.init,
    sortOption: atoms.sortOptionAtom.init,
    startDate: atoms.startDateAtom.init,
    endDate: atoms.endDateAtom.init,
    tempOnOfflineFilter: atoms.tempOnOfflineFilterAtom.init,
    tempFreeFilter: atoms.tempFreeFilterAtom.init,
    tempStartDate: atoms.tempStartDateAtom.init,
    tempEndDate: atoms.tempEndDateAtom.init,
  };
};
