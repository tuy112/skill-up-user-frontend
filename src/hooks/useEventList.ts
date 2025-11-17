// src/hooks/useEventList.ts

import { useQuery } from "@tanstack/react-query";
import { getEventList } from "@/api/events";
import { EventSearchParams, Event } from "@/types/event";

export const useEventList = (
  params: EventSearchParams,
  initialData?: Event[]
) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEventList(params),
    initialData, // SSR에서 받은 초기 데이터
  });
};
