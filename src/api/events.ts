// src/api/events.ts

import { EventCategory } from "@/constants/event";
import tokenInstance from "./tokenInstance";
import instance from "./instance";
import { Event, EventSearchParams, EventListResponse } from "@/types/event";

// 행사 등록 API (인증 필요)
// TODO : Event 타입 맞지 않아서 추후 변경 필요
export const createEvent = async (event: Event) => {
  const response = await tokenInstance.post("/events", event);
  return response.data.data;
};

// 행사 목록 조회 API (공개)
export const getEventList = async (
  eventSearchParams: EventSearchParams
): Promise<EventListResponse> => {
  // 필수 필드와 선택 필드 분리
  const { category, sort, page, ...optionalParams } = eventSearchParams;

  // 선택 필드 중 값이 있는 것만 필터링
  const filteredOptionalParams = Object.entries(optionalParams).reduce(
    (acc, [key, value]) => {
      // undefined, null, 빈 문자열, 빈 배열 제외
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        acc[key as keyof typeof optionalParams] = value as never;
      }
      return acc;
    },
    {} as Partial<EventSearchParams>
  );

  // 필수 필드 + 필터링된 선택 필드
  const params = {
    category,
    sort,
    page,
    ...filteredOptionalParams,
  };

  const response = await instance.post("/events/category-page/search", params);
  return response.data.data;
};

// 행사 상세 조회 API (공개)
export const getEventDetail = async (eventId: number) => {
  const response = await instance.get(`/events/${eventId}`);
  return response.data.data;
};

// 행사 수정 API (인증 필요)
export const updateEvent = async (eventId: number) => {
  const response = await tokenInstance.put(`/events/${eventId}`);
  return response.data.data;
};

// 행사 삭제 API (인증 필요)
export const deleteEvent = async (eventId: number) => {
  const response = await tokenInstance.delete(`/events/${eventId}`);
  return response.data.data;
};

// "이런 행사는 어때요" 추천 행사 조회 API (공개)
export const getRecommendedEvents = async (category: EventCategory) => {
  const response = await instance.get("/events/category-page/recommended", {
    params: {
      category,
    },
  });
  return response.data.data;
};
