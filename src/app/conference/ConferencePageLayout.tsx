// src/app/conference/ConferencePageLayout.tsx

"use client";

import EventPageLayout from "@/components/events/EventPageLayout";
import ConferenceFilterView from "@/components/events/filters/views/ConferenceFilterView";
import { Event } from "@/types/event/event";

export default function ConferencePageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  return (
    <EventPageLayout
      pageId="conference"
      title="컨퍼런스 · 세미나"
      eventList={eventList}
      FilterView={ConferenceFilterView}
      emptyUrl="/conference/create"
    />
  );
}
