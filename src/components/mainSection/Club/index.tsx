"use client";
import { useRef, useEffect, useState } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import { useCategoryEvents } from "@/hooks/useHome";
import { EVENT_CATEGORY } from "@/constants/event";
import { Event } from "@/types/event";

export default function Club() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // API 데이터 가져오기 (동아리·해커톤·공모전 카테고리, 8개)
  const { data, isLoading, error } = useCategoryEvents(
    EVENT_CATEGORY.COMPETITION_HACKATHON,
    8,
    1
  );

  // 무한 캐러셀을 위해 카드를 3번 복제
  const originalCards = data?.homeEventResponseList || [];
  const cards = [...originalCards, ...originalCards, ...originalCards];

  useEffect(() => {
    const el = trackRef.current;
    if (!el || originalCards.length === 0) return;

    // 초기 위치를 중간(원본 카드 세트)으로 설정
    const firstCard = el.querySelector(`.${styles.card}`) as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 24; // 1.5rem = 24px
      const initialScroll = originalCards.length * (cardWidth + gap);
      el.scrollLeft = initialScroll;
    }

    const handleScroll = () => {
      if (isScrolling) return;

      const scrollLeft = el.scrollLeft;
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;
      const oneSetWidth = (scrollWidth - clientWidth) / 2;

      // 오른쪽 끝에 도달하면 중간으로 순간이동
      if (scrollLeft >= oneSetWidth * 1.9) {
        setIsScrolling(true);
        el.style.scrollBehavior = "auto"; // 부드러운 전환 끄기
        el.scrollLeft = oneSetWidth;
        setTimeout(() => {
          el.style.scrollBehavior = "smooth"; // 다시 켜기
          setIsScrolling(false);
        }, 50);
      }
      // 왼쪽 끝에 도달하면 중간으로 순간이동
      else if (scrollLeft <= oneSetWidth * 0.1) {
        setIsScrolling(true);
        el.style.scrollBehavior = "auto"; // 부드러운 전환 끄기
        el.scrollLeft = oneSetWidth;
        setTimeout(() => {
          el.style.scrollBehavior = "smooth"; // 다시 켜기
          setIsScrolling(false);
        }, 50);
      }
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling, originalCards.length]);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector(`.${styles.card}`) as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // 1.5rem = 24px
    const step = cardWidth + gap;

    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <Flex
      as="section"
      className={styles.challengeSection}
      aria-labelledby="club-title"
      gap="2.5rem"
      direction="column"
    >
      <Flex justify="space-between" align="center" gap="2.5rem">
        <Flex direction="column" gap="0.25rem">
          <Text typography="sub2_m_18" color="primary-strong">
            동아리 · 해커톤 · 공모전
          </Text>
          <Flex gap="0.5rem">
            <Text typography="head1_m_42" color="black">
              바로 도전 가능한
            </Text>
            <Text typography="head5_sb_42" color="black">
              동아리·해커톤·공모전
            </Text>
          </Flex>
        </Flex>

        <Flex align="center" gap="0.75rem">
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => scroll("prev")}
            aria-label="이전"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.dark}`}
            onClick={() => scroll("next")}
            aria-label="다음"
          >
            <ChevronRightIcon color="#fff" />
          </button>
        </Flex>
      </Flex>
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
      ) : originalCards.length === 0 ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            도전 가능한 동아리·해커톤·공모전이 없습니다.
          </Text>
        </Flex>
      ) : (
        <div className={styles.trackWrap}>
          <Flex gap="1.5rem" className={styles.track} as="div">
            <div ref={trackRef} className={styles.trackInner}>
              {cards.map((event: Event, idx) => (
                <article key={`${event.id}-${idx}`} className={styles.card}>
                  <div
                    className={styles.thumb}
                    style={{
                      backgroundImage: `url(${event.thumbnailUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <Flex align="flex-end" gap="0.75rem" className={styles.overlay}>
                    <Flex
                      direction="column"
                      gap="0.375rem"
                      className={styles.texts}
                    >
                      <Text
                        typography="sub1_m_20"
                        color="white"
                        className={styles.cardText}
                      >
                        {event.title}
                      </Text>
                      <Text
                        typography="body2_r_14"
                        color="white"
                        className={styles.cardText}
                      >
                        {event.scheduleText}
                      </Text>
                    </Flex>
                    <Button size="small" variant="secondary">
                      자세히 보기
                    </Button>
                  </Flex>
                </article>
              ))}
            </div>
          </Flex>
        </div>
      )}
    </Flex>
  );
}
