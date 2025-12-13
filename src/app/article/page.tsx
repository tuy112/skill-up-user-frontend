// src/app/article/page.tsx

import { Suspense } from "react";
import ArticlePageLayout from "./ArticlePageLayout";

export default function ArticlePage() {
  return (
    <div style={{ paddingTop: "6rem" }}>
      {/* TODO : 추후 스켈레톤 추가 */}
      <Suspense fallback={<div>Loading...</div>}>
        <ArticlePageLayout />
      </Suspense>
    </div>
  );
}
