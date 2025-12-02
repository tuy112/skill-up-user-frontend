// src/app/conference/page.tsx

import ConferencePageLayout from "./ConferencePageLayout";
import { getEventList } from "@/api/events";
import { EventSearchParams } from "@/types/event";
import { EventSortOption, EVENT_SORT_OPTIONS } from "@/constants/event";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  // 정렬 옵션 검증
  const sortParam = params.sort as string;
  const validSortOptions = Object.values(EVENT_SORT_OPTIONS);
  const sort: EventSortOption = validSortOptions.includes(
    sortParam as EventSortOption
  )
    ? (sortParam as EventSortOption)
    : "latest";

  // URL 파라미터를 API 파라미터로 변환
  const apiParams: EventSearchParams = {
    category: "CONFERENCE_SEMINAR",
    sort,
    page: params.page ? parseInt(params.page as string, 10) - 1 : 0, // UI 1-based -> API 0-based
  };

  // 역할 필터
  if (params.roles && typeof params.roles === "string") {
    const roles = params.roles.split(",");
    if (!roles.includes("전체")) {
      apiParams.targetRoles = roles;
    }
  }

  // 온/오프라인 필터
  if (params.mode === "online") {
    apiParams.isOnline = true;
  } else if (params.mode === "offline") {
    apiParams.isOnline = false;
  }

  // 무료 필터
  if (params.isFree === "true") {
    apiParams.isFree = true;
  }

  // 날짜 필터
  if (params.startDate && typeof params.startDate === "string") {
    apiParams.startDate = params.startDate;
  }
  if (params.endDate && typeof params.endDate === "string") {
    apiParams.endDate = params.endDate;
  }

  // SSR: 초기 데이터 서버에서 로드 (URL 파라미터 반영)
  const initialEventList =
    (await getEventList(apiParams))?.homeEventResponseList || [];

  return (
    <div style={{ paddingTop: "6rem", paddingBottom: "11.25rem" }}>
      <ConferencePageLayout
        initialEventList={initialEventList}
        initialParams={apiParams}
      />
    </div>
  );
}
