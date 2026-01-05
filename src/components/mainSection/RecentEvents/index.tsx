// src/components/mainSection/RecentEvents/index.tsx
// 최근 본 행사
"use client";
import { useRef } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import EventCard from "@/components/common/EventCard";
import Text from "@/components/common/Text";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { useRecentEvents } from "@/hooks/useHome";
import { Event } from "@/types/event";

export default function RecentEvent() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // API 데이터 가져오기
  const { data, isLoading, error } = useRecentEvents();

  const getCardWidth = () => {
    if (!carouselRef.current) return 0;
    const firstCard = carouselRef.current.querySelector(
      `.${styles.carouselItem}`
    ) as HTMLElement;
    if (!firstCard) return 0;
    const cardWidth = firstCard.offsetWidth;
    const gap = 12; // 0.75rem = 12px
    return cardWidth + gap;
  };

  const prev = () => {
    if (carouselRef.current) {
      const scrollAmount = getCardWidth();
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const next = () => {
    if (carouselRef.current) {
      const scrollAmount = getCardWidth();
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex
      as="section"
      className={styles.recentEvent}
      aria-labelledby="recent-title"
      gap="2.5rem"
      direction="column"
    >
      <Flex direction="column" gap="0.5rem">
        <Text typography="sub2_m_18" color="primary-strong">
          최근 본 행사
        </Text>
        <Flex>
          <Text typography="head5_sb_42" color="black">
            관심있게 본 행사
          </Text>
          <Text typography="head1_m_42" color="black">
            를 다시 만나보세요
          </Text>
        </Flex>
      </Flex>

      <div className={styles.carouselWrapper}>
        {isLoading ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-70">
              로딩중...
            </Text>
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-70">
              데이터를 불러오는데 실패했습니다.
            </Text>
          </Flex>
        ) : !data ||
          !data.homeEventResponseList ||
          data.homeEventResponseList.length === 0 ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-70">
              최근 본 행사가 없습니다.
            </Text>
          </Flex>
        ) : (
          <div ref={carouselRef} className={styles.carouselContainer}>
            {data.homeEventResponseList.map((item: Event) => (
              <div key={item.id} className={styles.carouselItem}>
                <EventCard size="large" event={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Flex align="center" justify="space-between" className={styles.bottomRow}>
        <Flex align="center" gap="1.25rem">
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.lightBtn}`}
            onClick={prev}
            aria-label="이전 페이지"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.darkBtn}`}
            onClick={next}
            aria-label="다음 페이지"
          >
            <ChevronRightIcon color="#fff" />
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}
