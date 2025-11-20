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

  const { data: eventList, isLoading } = useEventList(
    searchParams,
    initialEventList,
    initialParams
  );

  return (
    <EventPageLayout
      pageId="hackathon"
      title="동아리 · 해커톤 · 공모전"
      eventList={eventList || []}
      FilterView={HackathonFilterView}
      emptyUrl="/hackathon/create"
      isLoadingEventList={isLoading}
    />
  );
}
