// src/components/events/EventPageLayout/index.tsx

"use client";

import { useMemo } from "react";
import { useAtom } from "jotai";
import EventCard from "@/components/common/EventCard";
import EventEmpty from "@/components/events/EventEmpty";
import EventPageHeader from "@/components/events/EventPageHeader";
import Pagination from "@/components/common/Pagination";
import Button from "@/components/common/Button";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { Event } from "@/types/event";
import { usePageFilters } from "@/components/events/filters/hooks/usePageFilters";
import { ITEMS_PER_PAGE, generatePageOptions } from "@/constants/pagination";
import styles from "./styles.module.css";
import { EventSortOption } from "@/constants/event";
import { useRecommendedEvents } from "@/hooks/useRecommendedEvents";
import {
  PAGE_CATEGORY_MAP,
  pageFilterAtomsMap,
} from "@/components/events/filters/atoms/pageFilterAtoms";

interface EventPageLayoutProps {
  pageId: "bootcamp" | "conference" | "hackathon" | "mentoring";
  title: string;
  eventList: Event[];
  total: number;
  FilterView: React.ComponentType;
  emptyUrl: string;
  isLoadingEventList?: boolean;
}

export default function EventPageLayout({
  pageId,
  title,
  eventList,
  total,
  FilterView,
  emptyUrl,
  isLoadingEventList = false,
}: EventPageLayoutProps) {
  const {
    selectedRoles,
    setSelectedRoles,
    onOfflineFilter,
    setOnOfflineFilter,
    freeFilter,
    setFreeFilter,
    sortOption,
    setSortOption,
    setTempOnOfflineFilter,
    setTempFreeFilter,
    handleApply,
    handleReset,
  } = usePageFilters({ pageId });

  const [currentPage, setCurrentPage] = useAtom(
    pageFilterAtomsMap[pageId].currentPageAtom
  );

  // 추천 이벤트 조회 - 검색 결과가 없을 때만 호출 (로딩 중이 아닐 때)
  const category = PAGE_CATEGORY_MAP[pageId];
  const shouldFetchRecommended = !isLoadingEventList && eventList.length === 0;
  const { data: recommendedEvents, isLoading: isLoadingRecommended } =
    useRecommendedEvents(category, shouldFetchRecommended);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const pageOptions = useMemo(
    () => generatePageOptions(totalPages),
    [totalPages]
  );

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return eventList.slice(startIndex, endIndex);
  }, [eventList, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Flex
      direction="column"
      align="flex-start"
      gap={1.25}
      className={styles.container}
    >
      <EventPageHeader
        title={title}
        count={total}
        selectedRoles={selectedRoles}
        onRolesChange={setSelectedRoles}
        onOfflineFilter={onOfflineFilter}
        freeFilter={freeFilter}
        onClearOnOfflineFilter={() => {
          setOnOfflineFilter("");
          setTempOnOfflineFilter("");
        }}
        onClearFreeFilter={() => {
          setFreeFilter(false);
          setTempFreeFilter(false);
        }}
        sortOption={sortOption}
        onSortChange={(value) => setSortOption(value as EventSortOption)}
        onApply={handleApply}
        onReset={handleReset}
        FilterView={FilterView}
      />

      <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
        {total > 0 && eventList.length === 0 ? (
          // total은 있는데 현재 페이지에 데이터가 없는 경우 (페이지 범위 초과)
          <>
            <EventEmpty
              description={
                <div style={{ textAlign: "center" }}>
                  조건에 맞는 행사가 없어요. <br /> 조건을 다시 설정해보세요
                </div>
              }
              url={emptyUrl}
              buttonText="행사 등록하기"
            />
            <Flex direction="column" gap={1}>
              <Flex align="center" justify="space-between">
                <Text typography="head3_m_24" color="black" as="h3">
                  이런 행사는 어떠세요?
                </Text>
                <Button
                  variant="textOnly"
                  icon={<ChevronRightIcon />}
                  size="medium"
                >
                  IT 행사 더보기
                </Button>
              </Flex>
              <div className={styles.cardList}>
                {isLoadingRecommended ? (
                  <Text typography="body1_r_16" color="neutral-40">
                    추천 행사를 불러오는 중...
                  </Text>
                ) : recommendedEvents && recommendedEvents.length > 0 ? (
                  recommendedEvents
                    .slice(0, 3)
                    .map((event: Event) => (
                      <EventCard key={event.id} size="medium" event={event} />
                    ))
                ) : (
                  <Text typography="body1_r_16" color="neutral-40">
                    추천할 행사가 없습니다.
                  </Text>
                )}
              </div>
            </Flex>
          </>
        ) : eventList.length === 0 ? (
          // total도 0이고 데이터도 없는 경우 (실제로 데이터가 없음)
          <>
            <EventEmpty
              description={<>{title}에 등록된 행사가 없어요</>}
              url={emptyUrl}
              buttonText="행사 등록하기"
            />
            <Flex direction="column" gap={1}>
              <Flex align="center" justify="space-between">
                <Text typography="head3_m_24" color="black" as="h3">
                  이런 행사는 어떠세요?
                </Text>
                <Button
                  variant="textOnly"
                  icon={<ChevronRightIcon />}
                  size="medium"
                >
                  IT 행사 더보기
                </Button>
              </Flex>
              <div className={styles.cardList}>
                {isLoadingRecommended ? (
                  <Text typography="body1_r_16" color="neutral-40">
                    추천 행사를 불러오는 중...
                  </Text>
                ) : recommendedEvents && recommendedEvents.length > 0 ? (
                  recommendedEvents
                    .slice(0, 3)
                    .map((event: Event) => (
                      <EventCard key={event.id} size="medium" event={event} />
                    ))
                ) : (
                  <Text typography="body1_r_16" color="neutral-40">
                    추천할 행사가 없습니다.
                  </Text>
                )}
              </div>
            </Flex>
          </>
        ) : (
          // 데이터가 있는 경우
          <Flex direction="column" gap={6.25} style={{ width: "100%" }}>
            <div className={styles.cardList}>
              {paginatedEvents.map((item) => (
                <EventCard key={item.id} size="medium" event={item} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              options={pageOptions}
              selected={
                pageOptions.find((opt) => opt.value === `${currentPage}`) ||
                pageOptions[0]
              }
              onSelect={(option) => setCurrentPage(parseInt(option.value))}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
