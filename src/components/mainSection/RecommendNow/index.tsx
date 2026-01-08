// src/components/mainSection/RecommendNow/index.tsx
// 지금 주목받고 있어요

"use client";

import { useRef, useState } from "react";
import Flex from "@/components/common/Flex";
import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import { useFeaturedEvents } from "@/hooks/useHome";
import { Event } from "@/types/event";
import {
  JobCategory,
  JOB_CATEGORY,
  JOB_CATEGORY_TABS,
  getJobCategoryByLabel,
} from "@/constants/category";

export default function RecommendNow() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>(
    JOB_CATEGORY.ALL
  );

  // API 데이터 가져오기
  const { data, isLoading, error } = useFeaturedEvents(selectedCategory);

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
    <section className={styles.recommendNow}>
      <Flex direction="column" gap="2.5rem">
        <Flex justify="space-between" align="flex-end">
          <Flex direction="column" gap="0.5rem">
            <Text typography="sub2_m_18" color="primary-strong">
              추천행사
            </Text>
            <Flex gap="0.5rem">
              <Text typography="head1_m_42" color="black">
                지금
              </Text>
              <Text typography="head5_sb_42" color="black">
                주목받고 있어요
              </Text>
            </Flex>
          </Flex>

          <TabMenu
            tabs={JOB_CATEGORY_TABS}
            defaultIndex={0}
            onChange={(selected: string) => {
              const category = getJobCategoryByLabel(selected);
              setSelectedCategory(category);
            }}
            theme="light"
          />
        </Flex>

        <div className={styles.carouselWrapper}>
          {isLoading ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
              <Text typography="body1_r_16" color="neutral-70">
                로딩중...
              </Text>
            </Flex>
          ) : error ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
              <Text typography="body1_r_16" color="neutral-70">
                데이터를 불러오는데 실패했습니다.
              </Text>
            </Flex>
          ) : !data ||
            !data.homeEventResponseList ||
            data.homeEventResponseList.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              style={{ minHeight: "300px" }}
            >
              <Text typography="body1_r_16" color="neutral-70">
                표시할 행사가 없습니다.
              </Text>
            </Flex>
          ) : (
            <div ref={carouselRef} className={styles.carouselContainer}>
              {data.homeEventResponseList.map((item: Event) => (
                <div key={item.id} className={styles.carouselItem}>
                  <EventCard
                    size="large"
                    event={item}
                    className={styles.carouselItem}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Flex
          align="center"
          justify="space-between"
          className={styles.bottomRow}
        >
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

          <Flex justify="center">
            <button className={styles.moreBtn}>IT 인기 행사 더보기</button>
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
}
