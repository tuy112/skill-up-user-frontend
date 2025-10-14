// src/app/mentoring/page.tsx

import MentoringPageLayout from "./MentoringPageLayout";
import { getMockEventList } from "@/mocks/eventListMock";

export default async function MentoringPage() {
  const eventList = await getMockEventList();
  return (
    <div style={{ marginTop: "6rem" }}>
      <MentoringPageLayout eventList={eventList} />
    </div>
  );
}
