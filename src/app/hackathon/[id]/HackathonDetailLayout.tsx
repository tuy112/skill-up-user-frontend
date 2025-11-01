// src/app/hackathon/[id]/HackathonDetailLayout.tsx

import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";
import EventInfoCard from "@/components/events/detail/EventInfoCard";
import Badge from "@/components/common/Badge";
import GlobeIcon from "@/assets/svg/globeIcon.svg";
import CursorIcon from "@/assets/svg/cursorIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import EventCard from "@/components/common/EventCard";
import { eventListMock } from "@/mocks/eventListMock";
import { EventDetail } from "@/types/event/event";

export default function HackathonDetailLayout({
  eventDetail,
}: {
  eventDetail: EventDetail;
}) {
  return (
    <div className={styles.hackathonDetailLayout}>
      <StickyApplySection
        category={eventDetail.category}
        title={eventDetail.title}
        date={eventDetail.date}
        place={eventDetail.place}
        price={eventDetail.price}
        phoneNumber={eventDetail.phoneNumber}
        image={eventDetail.image}
      />
      <div className={styles.hackathonDetailContent}>
        <div className={styles.hackathonDetailContentItem}>
          <EventInfoCard title="행사 설명">
            {eventDetail.description}
          </EventInfoCard>
          <EventInfoCard title="모집 기간" isDate>
            <div className={styles.eventInfoCardContentDate}>
              <Text typography="body1_r_16" color="neutral-20">
                {eventDetail.date}
              </Text>
              <Badge label="N일 남았어요" />
            </div>
          </EventInfoCard>
          <EventInfoCard title="참가비">
            <div className={styles.eventInfoCardContentPrice}>
              <Text typography="body1_r_16" color="neutral-20">
                {eventDetail.price}
              </Text>
              <Badge label="무료" />
            </div>
          </EventInfoCard>
          <EventInfoCard title="장소">
            <div className={styles.eventInfoCardContentPlaceList}>
              <div className={styles.eventInfoCardContentPlace}>
                <Image src={GlobeIcon} alt="globe icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.online ? "온라인" : "오프라인"}
                </Text>
              </div>
              <div className={styles.eventInfoCardContentPlace}>
                <Image src={CursorIcon} alt="cursor icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  {eventDetail.place}
                </Text>
                {/* TODO : 추후 네이버 지도 api 추가 */}
              </div>
            </div>
          </EventInfoCard>
        </div>
        <div className={styles.hackathonOtherEvent}>
          <Text typography="head3_m_24" color="black" as="h3">
            이런 행사는 어떠세요?
          </Text>
          {/* 목업데이터 */}
          <div className={styles.hackathonOtherEventList}>
            <EventCard size="small" event={eventListMock[0]} block />
            <EventCard size="small" event={eventListMock[1]} block />
            <EventCard size="small" event={eventListMock[2]} block />
          </div>
        </div>
      </div>
    </div>
  );
}
