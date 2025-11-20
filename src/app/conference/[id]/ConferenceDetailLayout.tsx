// src/app/conference/[id]/ConferenceDetailLayout.tsx

"use client";

import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";
import EventInfoCard from "@/components/events/detail/EventInfoCard";
import Badge from "@/components/common/Badge";
import GlobeIcon from "@/assets/svg/globeIcon.svg";
import CursorIcon from "@/assets/svg/cursorIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import EventCard from "@/components/common/EventCard";
import Flex from "@/components/common/Flex";
import { eventListMock } from "@/mocks/eventListMock";
import { useEventDetail } from "@/hooks/useEventDetail";
import { formatDate, formatPriceWithUnit, getDdayLabel } from "@/utils/format";

export default function ConferenceDetailLayout({
  eventId,
}: {
  eventId: number;
}) {
  const { data: eventDetail, isLoading } = useEventDetail(eventId);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "80vh" }}>
        <Text typography="body1_r_16" color="neutral-40">
          로딩 중...
        </Text>
      </Flex>
    );
  }

  if (!eventDetail) return null;

  return (
    <Flex gap="1rem" className={styles.conferenceDetailLayout}>
      <StickyApplySection
        category={eventDetail.category}
        title={eventDetail.title}
        eventStart={formatDate(eventDetail.eventStart)}
        eventEnd={formatDate(eventDetail.eventEnd)}
        place={eventDetail.locationText}
        price={eventDetail.isFree ? 0 : eventDetail.price}
        phoneNumber={eventDetail.contact}
        image={eventDetail.thumbnailUrl}
        hashTags={eventDetail.hashTags}
      />
      <Flex
        direction="column"
        gap="6.25rem"
        style={{ marginBottom: "11.25rem" }}
      >
        <Flex direction="column" gap="0.75rem">
          <EventInfoCard title="행사 설명">
            {eventDetail.description}
          </EventInfoCard>
          <EventInfoCard title="모집 기간" isDate>
            <Flex align="center" gap="1rem">
              <Text typography="body1_r_16" color="neutral-20">
                {formatDate(eventDetail.recruitStart)} ~{" "}
                {formatDate(eventDetail.recruitEnd)}
              </Text>
              <Badge label={getDdayLabel(eventDetail.recruitEnd)} />
            </Flex>
          </EventInfoCard>
          <EventInfoCard title="참가비">
            <Flex align="center" gap="1rem">
              <Text typography="body1_r_16" color="neutral-20">
                {formatPriceWithUnit(eventDetail.price, eventDetail.isFree)}
              </Text>
              {eventDetail.isFree && <Badge label="무료" />}
            </Flex>
          </EventInfoCard>
          <EventInfoCard title="장소">
            <Flex direction="column" gap="0.375rem">
              <Flex align="center" gap="0.375rem">
                <Image src={GlobeIcon} alt="globe icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.isOnline ? "온라인" : "오프라인"}
                </Text>
              </Flex>
              <Flex align="center" gap="0.375rem">
                <Image src={CursorIcon} alt="cursor icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.locationText}
                </Text>
                {/* TODO : 추후 네이버 지도 api 추가 */}
              </Flex>
            </Flex>
          </EventInfoCard>
        </Flex>
        <Flex direction="column" gap="1rem">
          <Text typography="head3_m_24" color="black" as="h3">
            이런 행사는 어떠세요?
          </Text>
          {/* 목업데이터 */}
          <Flex align="center" gap="0.5rem">
            <EventCard size="small" event={eventListMock[0]} block />
            <EventCard size="small" event={eventListMock[1]} block />
            <EventCard size="small" event={eventListMock[2]} block />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
