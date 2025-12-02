// src/types/article.ts

export interface Article {
  id: number;
  thumbnailUrl: string;
  category: string; // "다양이", "이벤트", etc.
  title: string;
  description: string;
  tags: string[];
  date: string; // "2025.01.01"
}
