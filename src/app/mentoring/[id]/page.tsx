// src/app/mentoring/[id]/page.tsx

"use client";

import { use } from "react";
import MentoringDetailLayout from "./MentoringDetailLayout";

export default function MentoringDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = Number(resolvedParams.id);

  return <MentoringDetailLayout eventId={eventId} />;
}
