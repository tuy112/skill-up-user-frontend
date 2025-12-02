// src/hooks/useEventDetail.ts

import { useQuery } from "@tanstack/react-query";
import { getEventDetail } from "@/api/events";
import { EventDetail } from "@/types/event";

export const useEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventDetail(eventId),
    enabled: !!eventId, // eventId가 있을 때만 쿼리 실행
  });
};
