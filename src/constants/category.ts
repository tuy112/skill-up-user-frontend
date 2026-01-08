// src/constants/category.ts

// 직무 카테고리 (Featured Events용)
export const JOB_CATEGORY = {
  ALL: "ALL",
  PM: "PM",
  DESIGN: "DESIGN",
  DEVELOPMENT: "DEVELOPMENT",
  AI: "AI",
} as const;

export type JobCategory = (typeof JOB_CATEGORY)[keyof typeof JOB_CATEGORY];

// 직무 카테고리 라벨 (탭에 표시될 한국어 텍스트)
export const JOB_CATEGORY_LABEL: Record<JobCategory, string> = {
  ALL: "전체",
  PM: "기획",
  DESIGN: "디자인",
  DEVELOPMENT: "개발",
  AI: "AI",
} as const;

// 라벨로 카테고리 찾기 (탭 선택 시 사용)
export const getJobCategoryByLabel = (label: string): JobCategory => {
  const entry = Object.entries(JOB_CATEGORY_LABEL).find(
    ([_, value]) => value === label
  );
  return entry ? (entry[0] as JobCategory) : JOB_CATEGORY.ALL;
};

// 카테고리로 라벨 찾기
export const getJobCategoryLabel = (category: JobCategory): string => {
  return JOB_CATEGORY_LABEL[category];
};

// 탭 메뉴용 라벨 배열
export const JOB_CATEGORY_TABS = Object.values(JOB_CATEGORY_LABEL);
