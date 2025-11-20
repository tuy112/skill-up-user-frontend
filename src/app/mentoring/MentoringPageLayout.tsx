// src/app/mentoring/MentoringPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import MentoringFilterView from "@/components/events/filters/views/MentoringFilterView";
import { Event } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function MentoringPageLayout({
  initialEventList,
}: {
  initialEventList: Event[];
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("mentoring"),
    []
  );
  const searchParams = useAtomValue(searchParamsAtom);

  // SSR 시 사용한 초기 params
  const initialParams = useMemo(
    () => ({
      category: "NETWORKING_MENTORING" as const,
      sort: "latest" as const,
      page: 0,
    }),
    []
  );

  const { data: eventList, isLoading } = useEventList(
    searchParams,
    initialEventList,
    initialParams
  );

  return (
    <EventPageLayout
      pageId="mentoring"
      title="네트워킹 · 멘토링"
      eventList={eventList || []}
      FilterView={MentoringFilterView}
      emptyUrl="/conference/create"
      isLoadingEventList={isLoading}
    />
  );
}
