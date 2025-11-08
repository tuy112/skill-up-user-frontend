// src/app/mentoring/MentoringPageLayout.tsx

"use client";

import EventPageLayout from "@/components/events/EventPageLayout";
import MentoringFilterView from "@/components/events/filters/views/MentoringFilterView";
import { Event } from "@/types/event/event";

export default function MentoringPageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  return (
    <EventPageLayout
      pageId="mentoring"
      title="네트워킹 · 멘토링"
      eventList={eventList}
      FilterView={MentoringFilterView}
      emptyUrl="/conference/create"
    />
  );
}
