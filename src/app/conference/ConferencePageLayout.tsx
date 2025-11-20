// src/app/conference/ConferencePageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import { Event } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function ConferencePageLayout({
  initialEventList,
}: {
  initialEventList: Event[];
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("conference"),
    []
  );
  const searchParams = useAtomValue(searchParamsAtom);

  // SSR 시 사용한 초기 params
  const initialParams = useMemo(
    () => ({
      category: "CONFERENCE_SEMINAR" as const,
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
      pageId="conference"
      title="컨퍼런스 · 세미나"
      eventList={eventList || []}
      FilterView={ConferenceFilterView}
      emptyUrl="/conference/create"
      isLoadingEventList={isLoading}
    />
  );
}
