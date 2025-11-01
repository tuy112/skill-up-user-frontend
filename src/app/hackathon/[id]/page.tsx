// src/app/hackathon/[id]/page.tsx

import HackathonDetailLayout from "./HackathonDetailLayout";
import { eventDetailMock } from "@/mocks/eventDetailMock";

export default async function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const eventDetail = eventDetailMock.find(
    (event) => event.id === resolvedParams.id
  );
  return <HackathonDetailLayout eventDetail={eventDetail!} />;
}
