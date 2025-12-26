// src/components/mainSection/Bootcamp/index.tsx

"use client";
import EventCard from "@/components/common/EventCard";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import TabMenu from "@/components/common/Tab";
import Text from "@/components/common/Text";
import { useCategoryEvents } from "@/hooks/useHome";
import { EVENT_CATEGORY } from "@/constants/event";
import { Event } from "@/types/event";

export default function Bootcamp() {
  // API 데이터 가져오기 (부트캠프 카테고리, 4개)
  const { data, isLoading, error } = useCategoryEvents(
    EVENT_CATEGORY.BOOTCAMP_CLUB,
    4,
    1
  );

  return (
    <Flex
      as="section"
      className={styles.bootcampSection}
      aria-labelledby="recent-title"
    >
      <Flex direction="column" gap="2.5rem" className={styles.inner}>
        <Flex justify="space-between" align="flex-end" gap="2.5rem">
          <Flex direction="column">
            <Text typography="sub2_m_18" color="primary-strong">
              부트캠프
            </Text>
            <Flex gap="0.5rem">
              <Text typography="head1_m_42" color="white">
                지금
              </Text>
              <Text typography="head5_sb_42" color="white">
                모집중인 부트캠프
              </Text>
            </Flex>
          </Flex>

          <TabMenu
            tabs={["IT 개발", "기획", "디자인", "개발", "AI"]}
            defaultIndex={0}
            onChange={() => {}}
            theme="dark"
          />
        </Flex>

        {isLoading ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-95">
              로딩중...
            </Text>
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-95">
              데이터를 불러오는데 실패했습니다.
            </Text>
          </Flex>
        ) : !data || !data.homeEventResponseList || data.homeEventResponseList.length === 0 ? (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text typography="body1_r_16" color="neutral-95">
              모집중인 부트캠프가 없습니다.
            </Text>
          </Flex>
        ) : (
          <Flex gap="0.75rem">
            {data.homeEventResponseList.map((item: Event) => (
              <EventCard key={item.id} size="medium" event={item} />
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
