// src/types/event/event.ts
import { EventCategory, EventSortOption, EventStatus } from "@/constants/event";

export interface Event {
  id: number;
  thumbnailUrl: string;
  online: boolean;
  locationText: string;
  title: string;
  scheduleText: string;
  priceText: string;
  d_dayLabel: string;
  recommended: boolean;
  ad: boolean;
  bookmarked: boolean;
  category: EventCategory;
  recommendedRate: number;
}

export interface EventDetail {
  id: number;
  title: string;
  thumbnailUrl: string;
  category: EventCategory;
  eventStart: string;
  eventEnd: string;
  recruitStart: string;
  recruitEnd: string;
  isFree: boolean;
  price: number;
  isOnline: boolean;
  locationText: string;
  locationLink: string;
  applyLink: string;
  status: EventStatus;
  contact: string;
  description: string;
  hashTags: string[];
  targetRoles: string[];
}

// 행사 목록 조회 요청 타입
export interface EventSearchParams {
  category: EventCategory;
  isOnline?: boolean;
  isFree?: boolean;
  startDate?: string;
  endDate?: string;
  sort: EventSortOption;
  targetRoles?: string[];
  page: number;
  validDateRange?: boolean;
  validSort?: boolean;
}

// 행사 목록 조회 응답 타입
export interface EventListResponse {
  total: number;
  homeEventResponseList: Event[];
}
