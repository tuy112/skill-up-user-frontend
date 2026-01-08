// src/hooks/useArticle.ts

import { useQuery } from "@tanstack/react-query";
import { getArticleList, searchArticles } from "@/api/article";
import { JobCategory } from "@/constants/category";

// 홈화면 추천 아티클 목록 조회
export const useRecommendedArticles = (tab?: JobCategory) => {
  return useQuery({
    queryKey: ["home", "recommendedArticles", tab],
    queryFn: () => getArticleList(tab),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};

// 아티클 검색 및 목록 조회
export const useSearchArticles = (
  keyword?: string,
  page?: number,
  tabs?: string[]
) => {
  return useQuery({
    queryKey: ["articles", "search", keyword, page, tabs],
    queryFn: () => searchArticles(keyword, page, tabs),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
