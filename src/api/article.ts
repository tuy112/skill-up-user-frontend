// src/api/article.ts

import instance from "./instance";
import { JobCategory } from "@/constants/category";

// UI 역할명을 API 역할명으로 변환하는 맵
const ROLE_TO_API_MAP: Record<string, string> = {
  기획: "기획자",
  디자인: "디자이너",
  개발: "개발자",
  AI: "AI 개발자",
};

// 아티클 목록 조회 API (홈화면)
export const getArticleList = async (tab?: JobCategory) => {
  const response = await instance.get("/articles", {
    params: {
      ...(tab && { tab }),
    },
  });
  return response.data.data;
};

// 아티클 목록 조회 및 검색 API
export const searchArticles = async (
  keyword?: string,
  page?: number,
  tab?: string[]
) => {
  // UI 역할명을 API 역할명으로 변환
  const convertedTab = tab
    ?.filter((role) => role !== "전체")
    .map((role) => ROLE_TO_API_MAP[role] || role);

  const response = await instance.get("/articles/search", {
    params: {
      ...(keyword && { keyword }),
      ...(page !== undefined && { page }),
      // "전체"가 아닌 경우만 tab 파라미터 전달
      ...(convertedTab && convertedTab.length > 0 && { tab: convertedTab }),
    },
    paramsSerializer: {
      indexes: null, // tab[]=값 대신 tab=값 형식으로 변경
    },
  });
  return response.data.data;
};
