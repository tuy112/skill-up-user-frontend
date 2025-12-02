// src/mocks/eventListMock.ts

import LoginImage from "@/assets/images/loginImg.png";
import { Event } from "@/types/event";
import { EVENT_CATEGORY } from "@/constants/event";

export const eventListMock: Event[] = [
  {
    id: 1,
    thumbnailUrl: LoginImage.src.toString(),
    online: false,
    locationText: "서울 성동구 성수이로",
    title: "디자인 트렌드 2025",
    scheduleText: "2025.01.01 - 2025.01.02",
    priceText: "무료",
    d_dayLabel: "1일 남았어요",
    recommended: false,
    ad: false,
    bookmarked: false,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    recommendedRate: 85,
  },
  {
    id: 2,
    thumbnailUrl: LoginImage.src.toString(),
    online: false,
    locationText: "서울 강남구 테헤란로",
    title: "AI 리더스 서밋",
    scheduleText: "2025.02.01 - 2025.02.02",
    priceText: "50,000원",
    d_dayLabel: "1일 남았어요",
    recommended: true,
    ad: false,
    bookmarked: false,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    recommendedRate: 92,
  },
  {
    id: 3,
    thumbnailUrl: LoginImage.src.toString(),
    online: true,
    locationText: "온라인",
    title: "개발자 밋업",
    scheduleText: "2025.03.01",
    priceText: "무료",
    d_dayLabel: "1일 남았어요",
    recommended: false,
    ad: false,
    bookmarked: false,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    recommendedRate: 78,
  },
  {
    id: 4,
    thumbnailUrl: LoginImage.src.toString(),
    online: false,
    locationText: "부산 해운대구",
    title: "기획자들의 밤",
    scheduleText: "2025.04.05",
    priceText: "무료",
    d_dayLabel: "1일 남았어요",
    recommended: false,
    ad: false,
    bookmarked: true,
    category: EVENT_CATEGORY.CONFERENCE_SEMINAR,
    recommendedRate: 80,
  },
];

export const getMockEventList = async (): Promise<typeof eventListMock> => {
  return eventListMock;
};
