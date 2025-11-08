// src/app/mentoring/[id]/MentoringDetailLayout.tsx

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
import { EventDetail } from "@/types/event/event";
export default function MentoringDetailLayout({
  eventDetail,
}: {
  eventDetail: EventDetail;
}) {
  return (
    <Flex gap="1rem" className={styles.container}>
      <StickyApplySection
        category={eventDetail.category}
        title={eventDetail.title}
        date={eventDetail.date}
        place={eventDetail.place}
        price={eventDetail.price}
        phoneNumber={eventDetail.phoneNumber}
        image={eventDetail.image}
      />
      <Flex direction="column" gap="6.25rem" style={{ marginBottom: "11.25rem" }}>
        <Flex direction="column" gap="0.75rem">
          <EventInfoCard title="행사 설명">
            {eventDetail.description}
          </EventInfoCard>
          <EventInfoCard title="모집 기간" isDate>
            <Flex align="center" gap="1rem">
              <Text typography="body1_r_16" color="neutral-20">
                {eventDetail.date}
              </Text>
              <Badge label="N일 남았어요" />
            </Flex>
          </EventInfoCard>
          <EventInfoCard title="참가비">
            <Flex align="center" gap="1rem">
              <Text typography="body1_r_16" color="neutral-20">
                {eventDetail.price}
              </Text>
              <Badge label="무료" />
            </Flex>
          </EventInfoCard>
          <EventInfoCard title="장소">
            <Flex direction="column" gap="0.375rem">
              <Flex align="center" gap="0.375rem">
                <Image src={GlobeIcon} alt="globe icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.online ? "온라인" : "오프라인"}
                </Text>
              </Flex>
              <Flex align="center" gap="0.375rem">
                <Image src={CursorIcon} alt="cursor icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.place}
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
