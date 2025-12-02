// src/app/hackathon/[id]/page.tsx

"use client";

import { use } from "react";
import HackathonDetailLayout from "./HackathonDetailLayout";

export default function HackathonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = Number(resolvedParams.id);

  return <HackathonDetailLayout eventId={eventId} />;
}
