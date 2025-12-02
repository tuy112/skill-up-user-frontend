// src/app/bootcamp/[id]/page.tsx

"use client";

import { use } from "react";
import BootcampDetailLayout from "./BootcampDetailLayout";

export default function BootcampDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const eventId = Number(resolvedParams.id);

  return <BootcampDetailLayout eventId={eventId} />;
}
