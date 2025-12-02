// src/app/hackathon/HackathonPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import HackathonFilterView from "@/components/events/filters/views/HackathonFilterView";
import { Event, EventSearchParams } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function HackathonPageLayout({
  initialEventList,
  initialParams,
}: {
  initialEventList: Event[];
  initialParams: EventSearchParams;
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("hackathon"),
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
      pageId="hackathon"
      title="동아리 · 해커톤 · 공모전"
      eventList={eventList}
      total={total}
      FilterView={HackathonFilterView}
      emptyUrl="/hackathon/create"
      isLoadingEventList={isLoading}
    />
  );
}
