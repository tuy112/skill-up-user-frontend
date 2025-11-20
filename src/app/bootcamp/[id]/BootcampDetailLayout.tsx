// src/app/bootcamp/[id]/BootcampDetailLayout.tsx

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
import { useEventDetail } from "@/hooks/useEventDetail";
import { useRecommendedEvents } from "@/hooks/useRecommendedEvents";
import { formatDate, formatPriceWithUnit, getDdayLabel } from "@/utils/format";
import { EVENT_CATEGORY } from "@/constants/event";
import { Event } from "@/types/event";

export default function BootcampDetailLayout({ eventId }: { eventId: number }) {
  const { data: eventDetail, isLoading } = useEventDetail(eventId);
  const { data: recommendedEvents, isLoading: isLoadingRecommended } =
    useRecommendedEvents(EVENT_CATEGORY.BOOTCAMP_CLUB);

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
    <Flex gap="1rem" className={styles.bootcampDetailLayout}>
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
          {isLoadingRecommended ? (
            <Flex align="center" gap="0.5rem">
              <Text typography="body1_r_16" color="neutral-40">
                추천 행사를 불러오는 중...
              </Text>
            </Flex>
          ) : recommendedEvents && recommendedEvents.length > 0 ? (
            <Flex align="center" gap="0.5rem">
              {recommendedEvents.slice(0, 3).map((event: Event) => (
                <EventCard key={event.id} size="small" event={event} block />
              ))}
            </Flex>
          ) : (
            <Flex align="center" gap="0.5rem">
              <Text typography="body1_r_16" color="neutral-40">
                추천할 행사가 없습니다.
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
