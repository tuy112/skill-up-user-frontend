// src/app/mentoring/MentoringPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import MentoringFilterView from "@/components/events/filters/views/MentoringFilterView";
import { Event, EventSearchParams } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function MentoringPageLayout({
  initialEventList,
  initialParams,
}: {
  initialEventList: Event[];
  initialParams: EventSearchParams;
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("mentoring"),
    []
  );
  const searchParams = useAtomValue(searchParamsAtom);

  const { data, isLoading } = useEventList(
    searchParams,
    initialEventList,
    initialParams
  );

  const eventList = data?.homeEventResponseList || [];
  const total = data?.total || 0;

  return (
    <EventPageLayout
      pageId="mentoring"
      title="네트워킹 · 멘토링"
      eventList={eventList}
      total={total}
      FilterView={MentoringFilterView}
      emptyUrl="/conference/create"
      isLoadingEventList={isLoading}
    />
  );
}
