// src/app/hackathon/HackathonPageLayout.tsx

"use client";

import EventPageLayout from "@/components/events/EventPageLayout";
import HackathonFilterView from "@/components/events/filters/views/HackathonFilterView";
import { Event } from "@/types/event/event";

export default function HackathonPageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  return (
    <EventPageLayout
      pageId="hackathon"
      title="동아리 · 해커톤 · 공모전"
      eventList={eventList}
      FilterView={HackathonFilterView}
      emptyUrl="/hackathon/create"
    />
  );
}
