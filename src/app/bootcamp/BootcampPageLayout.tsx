// src/app/bootcamp/BootcampPageLayout.tsx

"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import EventPageLayout from "@/components/events/EventPageLayout";
import BootcampFilterView from "@/components/events/filters/views/BootcampFilterView";
import { Event, EventSearchParams } from "@/types/event";
import { useEventList } from "@/hooks/useEventList";
import { createEventSearchParamsAtom } from "@/components/events/filters/atoms/pageFilterAtoms";

export default function BootcampPageLayout({
  initialEventList,
  initialParams,
}: {
  initialEventList: Event[];
  initialParams: EventSearchParams;
}) {
  const searchParamsAtom = useMemo(
    () => createEventSearchParamsAtom("bootcamp"),
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
      pageId="bootcamp"
      title="부트캠프"
      eventList={eventList}
      total={total}
      FilterView={BootcampFilterView}
      emptyUrl="/bootcamp/create"
      isLoadingEventList={isLoading}
    />
  );
}
