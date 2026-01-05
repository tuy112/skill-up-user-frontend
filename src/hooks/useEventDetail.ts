// src/hooks/useEventDetail.ts

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventDetail, toggleEventBookmark } from "@/api/events";

export const useEventDetail = (eventId: number) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventDetail(eventId),
    enabled: !!eventId, // eventId가 있을 때만 쿼리 실행
  });
};

// 행사 북마크 토글
export const useToggleEventBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => toggleEventBookmark(eventId),
    onSuccess: (_, eventId) => {
      // 해당 행사의 상세 정보 refetch
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      // 행사 목록도 refetch (북마크 상태가 목록에도 표시될 수 있으므로)
      queryClient.invalidateQueries({ queryKey: ["events"] });
      // 홈 화면의 추천/인기/마감 행사들도 refetch
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
