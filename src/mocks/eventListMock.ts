// src/mocks/eventListMock.ts

import LoginImage from "@/assets/images/loginImg.png";
import { Event } from "@/types/event/event";

export const eventListMock: Event[] = [
  {
    id: "1",
    title: "디자인 트렌드 2025",
    date: "2025.01.01 - 2025.01.02",
    place: "서울 성동구 성수이로",
    price: "0원",
    category: "디자인",
    url: "/conference/1",
    image: LoginImage.src.toString(),
    badgeLabel: "마감 D-1",
  },
  {
    id: "2",
    title: "AI 리더스 서밋",
    date: "2025.02.01 - 2025.02.02",
    place: "서울 강남구 테헤란로",
    price: "50,000원",
    category: "AI",
    url: "/conference/2",
    image: LoginImage.src.toString(),
    badgeLabel: "마감 D-1",
  },
  {
    id: "3",
    title: "개발자 밋업",
    date: "2025.03.01",
    place: "온라인",
    price: "0원",
    category: "개발",
    url: "/conference/3",
    image: LoginImage.src.toString(),
    badgeLabel: "마감 D-1",
  },
  {
    id: "4",
    title: "기획자들의 밤",
    date: "2025.04.05",
    place: "부산 해운대구",
    price: "0원",
    category: "기획",
    url: "/conference/4",
    image: LoginImage.src.toString(),
    badgeLabel: "마감 D-1",
  },
];

export const getMockEventList = async (): Promise<typeof eventListMock> => {
  return eventListMock;
};
