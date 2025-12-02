// src/app/conference/[id]/page.tsx

"use client";

import { use } from "react";
import ConferenceDetailLayout from "./ConferenceDetailLayout";

export default function ConferenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = Number(resolvedParams.id);

  return <ConferenceDetailLayout eventId={eventId} />;
}
