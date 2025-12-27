// src/hooks/useEventList.ts

import { useQuery } from "@tanstack/react-query";
import { getEventList, searchEvents } from "@/api/events";
import {
  EventSearchParams,
  EventListResponse,
  Event,
  EventSearchRequest,
} from "@/types/event";

export const useEventList = (
  params: EventSearchParams,
  initialData?: Event[],
  initialParams?: EventSearchParams
) => {
  // 초기 params와 현재 params가 정확히 일치할 때만 initialData 사용
  const shouldUseInitialData =
    initialData &&
    initialParams &&
    JSON.stringify(params) === JSON.stringify(initialParams);

  // initialData가 있으면 새 응답 형식으로 변환
  const transformedInitialData =
    shouldUseInitialData && initialData
      ? { total: initialData.length, homeEventResponseList: initialData }
      : undefined;

  return useQuery<EventListResponse>({
    queryKey: ["events", params],
    queryFn: () => getEventList(params),
    initialData: transformedInitialData,
    staleTime: 0, // 항상 최신 데이터를 fetch하도록 설정
  });
};

// 행사 검색
export const useSearchEvents = (searchParams: EventSearchRequest) => {
  return useQuery<EventListResponse>({
    queryKey: ["events", "search", searchParams],
    queryFn: () => searchEvents(searchParams),
    staleTime: 0, // 항상 최신 데이터를 fetch하도록 설정
  });
};
