// src/app/profile/bookmarks/BookmarkPageLayout.tsx

"use client";

import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import ProfileCard from "@/components/myPage/bookmarks/ProfileCard";
import Pagination from "@/components/common/Pagination";
import Dropdown from "@/components/common/Dropdown";
import TabBar from "@/components/common/TabBar";
import Flex from "@/components/common/Flex";
import Skeleton from "@/components/common/Skeleton";
import BookmarkEmpty from "@/components/myPage/bookmarks/BookmarkEmpty";
import { useBookmarkPage } from "@/hooks/useBookmarkPage";

// BookmarkEmpty 컴포넌트를 반환하는 헬퍼 함수
const renderEmptyState = () => (
  <BookmarkEmpty
    title="저장한 행사가 없습니다"
    description={
      <>
        관심 있는 행사를 북마크하여 <br />
        나만의 행사 목록을 만들어보세요
      </>
    }
    url="/conference"
    buttonText="행사 둘러보기"
  />
);

export default function BookmarkPageLayout() {
  const {
    bookmarkData,
    isLoading,
    error,
    activeTabIndex,
    selectedSort,
    currentPage,
    selectedPageOption,
    eventList,
    totalPages,
    pageOptions,
    sortOptions,
    handleTabChange,
    handleSortChange,
    handlePageChange,
    handleDropdownSelect,
  } = useBookmarkPage();

  if (isLoading) {
    return (
      <Flex gap={1} className={styles.container}>
        <Skeleton width="18.75rem" height="15rem" />
        <Flex direction="column" gap={6.25} style={{ flex: 1 }}>
          <Skeleton width="100%" height="3rem" />
          <Skeleton width="100%" height="20rem" />
        </Flex>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex gap={1} className={styles.container}>
        <ProfileCard
          name={bookmarkData?.name || ""}
          email={bookmarkData?.email || ""}
          job={bookmarkData?.role || ""}
          bookmarkCount={bookmarkData?.bookmarkCount || 0}
        />
        <Flex direction="column" gap={6.25} className={styles.cardListContainer}>
          {renderEmptyState()}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex gap={1} className={styles.container}>
      <ProfileCard
        name={bookmarkData?.name || ""}
        email={bookmarkData?.email || ""}
        job={bookmarkData?.role || ""}
        bookmarkCount={bookmarkData?.bookmarkCount || 0}
      />

      <Flex direction="column" gap={6.25} className={styles.cardListContainer}>
        <Flex direction="column" gap={1.25}>
          <Flex align="center" justify="space-between">
            <TabBar
              tabs={[
                {
                  label: "진행 중",
                  count: bookmarkData?.recruitingEvents.length || 0,
                },
                {
                  label: "종료",
                  count: bookmarkData?.closedEvents.length || 0,
                },
              ]}
              activeIndex={activeTabIndex}
              onChange={handleTabChange}
            />
            <Dropdown
              options={sortOptions}
              selected={selectedSort}
              onSelect={handleSortChange}
            />
          </Flex>
          {eventList.length > 0 ? (
            <div className={styles.cardList}>
              {eventList.map((event) => (
                <EventCard key={event.id} size="medium" event={event} />
              ))}
            </div>
          ) : (
            renderEmptyState()
          )}
        </Flex>
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            options={pageOptions}
            selected={selectedPageOption}
            onSelect={handleDropdownSelect}
            goToPage={false}
          />
        )}
      </Flex>
    </Flex>
  );
}
