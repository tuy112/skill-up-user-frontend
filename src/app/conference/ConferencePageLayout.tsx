// src/app/conference/ConferencePageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import { Event, EventSearchParams } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function ConferencePageLayout({
  initialEventList,
  initialParams,
}: {
  initialEventList: Event[];
  initialParams: EventSearchParams;
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("conference"),
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
      pageId="conference"
      title="컨퍼런스 · 세미나"
      eventList={eventList}
      total={total}
      FilterView={ConferenceFilterView}
      emptyUrl="/conference/create"
      isLoadingEventList={isLoading}
    />
  );
}
