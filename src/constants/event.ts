// src/constants/event.ts

// 행사 카테고리
export const EVENT_CATEGORY = {
  CONFERENCE_SEMINAR: "CONFERENCE_SEMINAR",
  BOOTCAMP_CLUB: "BOOTCAMP_CLUB",
  COMPETITION_HACKATHON: "COMPETITION_HACKATHON",
  NETWORKING_MENTORING: "NETWORKING_MENTORING",
  ARTICLE: "ARTICLE",
} as const;

export type EventCategory =
  (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];

export const EVENT_CATEGORY_LABEL = {
  CONFERENCE_SEMINAR: "컨퍼런스 · 세미나",
  BOOTCAMP_CLUB: "부트캠프",
  COMPETITION_HACKATHON: "동아리 · 해커톤 · 공모전",
  NETWORKING_MENTORING: "네트워킹 · 멘토링",
  ARTICLE: "아티클",
} as const;

export type EventCategoryLabel =
  (typeof EVENT_CATEGORY_LABEL)[keyof typeof EVENT_CATEGORY_LABEL];
// 행사 정렬 옵션
export const EVENT_SORT_OPTIONS = {
  POPULARITY: "popularity",
  LATEST: "latest",
  DEADLINE: "deadline",
} as const;

export type EventSortOption =
  (typeof EVENT_SORT_OPTIONS)[keyof typeof EVENT_SORT_OPTIONS];

export const EVENT_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  HIDDEN: "HIDDEN",
} as const;

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];
