// src/app/conference/[id]/page.tsx

import ConferenceDetailLayout from "./ConferenceDetailLayout";
import { eventDetailMock } from "@/mocks/eventDetailMock";

export default async function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const eventDetail = eventDetailMock.find(
    (event) => event.id === resolvedParams.id
  );
  return <ConferenceDetailLayout eventDetail={eventDetail!} />;
}
