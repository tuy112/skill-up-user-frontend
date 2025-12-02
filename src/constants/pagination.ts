// src/constants/pagination.ts

import { DropdownOption } from "@/components/common/Dropdown";

export const SORT_OPTIONS: DropdownOption[] = [
  { label: "인기순", value: "popularity" },
  { label: "최신등록순", value: "latest" },
  { label: "모집마감순", value: "deadline" },
];

export const ITEMS_PER_PAGE = 12;

export const generatePageOptions = (totalPages: number): DropdownOption[] => {
  return Array.from({ length: Math.min(totalPages, 10) }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));
};
