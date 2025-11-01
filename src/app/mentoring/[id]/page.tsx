// src/app/mentoring/[id]/page.tsx

import MentoringDetailLayout from "./MentoringDetailLayout";
import { eventDetailMock } from "@/mocks/eventDetailMock";
export default async function MentoringDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const eventDetail = eventDetailMock.find(
    (event) => event.id === resolvedParams.id
  );
  return <MentoringDetailLayout eventDetail={eventDetail!} />;
}
