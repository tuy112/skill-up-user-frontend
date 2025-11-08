// src/app/bootcamp/BootcampPageLayout.tsx

"use client";

import EventPageLayout from "@/components/events/EventPageLayout";
import BootcampFilterView from "@/components/events/filters/views/BootcampFilterView";
import { Event } from "@/types/event/event";

export default function BootcampPageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  return (
    <EventPageLayout
      pageId="bootcamp"
      title="부트캠프"
      eventList={eventList}
      FilterView={BootcampFilterView}
      emptyUrl="/bootcamp/create"
    />
  );
}
