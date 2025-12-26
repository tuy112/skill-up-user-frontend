// 추천 콘텐츠
"use client";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import Text from "@/components/common/Text";
import { useCategoryEvents } from "@/hooks/useHome";
import { EVENT_CATEGORY } from "@/constants/event";
import { Event } from "@/types/event";

export default function RecommendedContent() {
  // API 데이터 가져오기 (아티클 카테고리, 5개)
  const { data, isLoading, error } = useCategoryEvents(
    EVENT_CATEGORY.ARTICLE,
    5,
    1
  );

  const events = data?.homeEventResponseList || [];

  return (
    <Flex
      as="section"
      className={styles.RecommendContent}
      aria-labelledby="rec-title"
      gap="2.5rem"
      direction="column"
    >
      <Flex justify="space-between" align="flex-end" gap="2.5rem">
        <Flex direction="column">
          <Text typography="sub2_m_18" color="primary-strong">
            추천 콘텐츠
          </Text>
          <Flex gap="0.5rem">
            <Text typography="head1_m_42" color="black">
              실무자를 위한
            </Text>
            <Text typography="head5_sb_42" color="black">
              추천 컨텐츠
            </Text>
          </Flex>
        </Flex>

        <TabMenu
          tabs={["IT 개발", "기획", "디자인", "개발", "AI"]}
          defaultIndex={2}
          onChange={() => {}}
          theme="light"
        />
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
      ) : events.length === 0 ? (
        <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
          <Text typography="body1_r_16" color="neutral-70">
            추천 컨텐츠가 없습니다.
          </Text>
        </Flex>
      ) : (
        <div className={styles.cardList}>
          {events.map((event: Event, idx: number) => (
            <Flex
              key={event.id}
              direction="column"
              className={`${styles.card} ${idx === 0 ? styles.heroCard : ""}`}
              as="article"
              gap="0.75rem"
            >
              <div
                className={`${styles.thumb} ${
                  idx === 0 ? styles.heroThumb : ""
                }`}
                style={{
                  backgroundImage: `url(${event.thumbnailUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Flex direction="column">
                <Flex align="center" justify="space-between">
                  <Text typography="head4_sb_20" color="black">
                    {event.title}
                  </Text>
                  <Flex align="center" gap="0.5rem">
                    <div className={styles.badge}>
                      <Text typography="label3_m_14" color="neutral-60">
                        {event.locationText}
                      </Text>
                    </div>
                    <div className={styles.badge}>
                      <Text typography="label3_m_14" color="neutral-60">
                        {event.scheduleText}
                      </Text>
                    </div>
                  </Flex>
                </Flex>

                <Text
                  typography="body1_r_16"
                  color="neutral-60"
                  className={styles.cardDesc}
                >
                  {event.priceText}
                </Text>
              </Flex>
            </Flex>
          ))}
        </div>
      )}

      <Flex justify="center">
        {/* 추후 컴포넌트로 교체 */}
        <button className={styles.moreBtn}>
          <Text typography="sub3_m_16" color="neutral-60">
            아티클 더보기
          </Text>
        </button>
      </Flex>
    </Flex>
  );
}
