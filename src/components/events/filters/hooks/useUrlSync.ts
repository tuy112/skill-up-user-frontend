// src/components/events/filters/hooks/useUrlSync.ts

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleOption } from "@/components/events/filters/types/role";
import { EventSortOption } from "@/constants/event";

interface UrlSyncParams {
  selectedRoles: RoleOption[];
  onOfflineFilter: string;
  freeFilter: boolean;
  sortOption: EventSortOption;
  startDate: Date | undefined;
  endDate: Date | undefined;
  currentPage: number;
}

interface SettersParams {
  setSelectedRoles: (roles: RoleOption[]) => void;
  setOnOfflineFilter: (filter: string) => void;
  setFreeFilter: (free: boolean) => void;
  setSortOption: (sort: EventSortOption) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  setCurrentPage: (page: number) => void;
  setTempOnOfflineFilter: (filter: string) => void;
  setTempFreeFilter: (free: boolean) => void;
  setTempStartDate: (date: Date | undefined) => void;
  setTempEndDate: (date: Date | undefined) => void;
}

// 필터 상태를 URL 쿼리 파라미터와 동기화하는 훅
export const useUrlSync = (
  params: UrlSyncParams,
  setters: SettersParams,
  pageId: string
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitializedRef = useRef(false);
  const isUpdatingFromUrlRef = useRef(false);

  // URL에서 초기 상태 읽기 (컴포넌트 마운트 시 한 번만)
  useEffect(() => {
    if (isInitializedRef.current) return;

    isUpdatingFromUrlRef.current = true;
    isInitializedRef.current = true;

    const rolesParam = searchParams.get("roles");
    const onOfflineParam = searchParams.get("mode");
    const freeParam = searchParams.get("isFree");
    const sortParam = searchParams.get("sort");
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const pageParam = searchParams.get("page");

    if (rolesParam) {
      const roles = rolesParam.split(",") as RoleOption[];
      setters.setSelectedRoles(roles);
    }

    if (onOfflineParam) {
      setters.setOnOfflineFilter(onOfflineParam);
      setters.setTempOnOfflineFilter(onOfflineParam);
    }

    if (freeParam === "true") {
      setters.setFreeFilter(true);
      setters.setTempFreeFilter(true);
    }

    if (sortParam) {
      setters.setSortOption(sortParam as EventSortOption);
    }

    if (startDateParam) {
      const date = new Date(startDateParam);
      setters.setStartDate(date);
      setters.setTempStartDate(date);
    }

    if (endDateParam) {
      const date = new Date(endDateParam);
      setters.setEndDate(date);
      setters.setTempEndDate(date);
    }

    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (!isNaN(page) && page > 0) {
        setters.setCurrentPage(page);
      }
    }

    // URL 초기화가 완료된 후 플래그 해제
    setTimeout(() => {
      isUpdatingFromUrlRef.current = false;
    }, 0);
  }, [pageId]); // pageId만 의존성으로 - 페이지 변경 시에만 재실행

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    if (!isInitializedRef.current || isUpdatingFromUrlRef.current) return;

    const newSearchParams = new URLSearchParams();

    // roles
    if (
      params.selectedRoles.length > 0 &&
      !params.selectedRoles.includes("전체")
    ) {
      newSearchParams.set("roles", params.selectedRoles.join(","));
    }

    // mode (online/offline)
    if (params.onOfflineFilter) {
      newSearchParams.set("mode", params.onOfflineFilter);
    }

    // isFree
    if (params.freeFilter) {
      newSearchParams.set("isFree", "true");
    }

    // sort (popularity가 기본값이므로 popularity일 때는 URL에 표시 안 함)
    if (params.sortOption !== "popularity") {
      newSearchParams.set("sort", params.sortOption);
    }

    // startDate
    if (params.startDate) {
      newSearchParams.set(
        "startDate",
        params.startDate.toISOString().split("T")[0]
      );
    }

    // endDate
    if (params.endDate) {
      newSearchParams.set(
        "endDate",
        params.endDate.toISOString().split("T")[0]
      );
    }

    // page
    if (params.currentPage > 1) {
      newSearchParams.set("page", params.currentPage.toString());
    }

    const queryString = newSearchParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    // 현재 URL과 다를 때만 업데이트
    const currentSearch = window.location.search;
    const newSearch = queryString ? `?${queryString}` : "";
    if (currentSearch !== newSearch) {
      router.replace(newUrl, { scroll: false });
    }
  }, [
    params.selectedRoles,
    params.onOfflineFilter,
    params.freeFilter,
    params.sortOption,
    params.startDate,
    params.endDate,
    params.currentPage,
    router,
  ]);
};
