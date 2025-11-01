// src/app/bootcamp/[id]/page.tsx

import BootcampDetailLayout from "./BootcampDetailLayout";
import { eventDetailMock } from "@/mocks/eventDetailMock";

export default async function BootcampDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const eventDetail = eventDetailMock.find(
    (event) => event.id === resolvedParams.id
  );
  return <BootcampDetailLayout eventDetail={eventDetail!} />;
}
