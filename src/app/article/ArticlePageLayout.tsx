// src/app/article/ArticlePageLayout.tsx

"use client";
import Flex from "@/components/common/Flex";
import EventHeader from "@/components/events/EventHeader";
import RoleSelector from "@/components/events/filters/RoleSelector";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import styles from "./styles.module.css";
import ArticleCard from "@/components/events/ArticleCard";
import { articleListMock } from "@/mocks/articleListMock";
import Pagination from "@/components/common/Pagination";

export default function ArticlePageLayout() {
  const { selectedRoles, setSelectedRoles } = usePageFilters({
    pageId: "article",
  });
  return (
    <div className={styles.container}>
      <Flex direction="column" gap={1.25}>
        <Flex direction="column" gap={1.5}>
          <EventHeader title="아티클" count={articleListMock.length} />
          <RoleSelector selected={selectedRoles} onSelect={setSelectedRoles} />
        </Flex>
        <Flex direction="column" gap={3.75}>
          <div className={styles.articleGrid}>
            {articleListMock.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <Pagination
            totalPages={10}
            currentPage={1}
            onPageChange={() => {}}
            options={[]}
            selected={{ label: "1", value: "1" }}
            onSelect={() => {}}
          />
        </Flex>
      </Flex>
    </div>
  );
}
