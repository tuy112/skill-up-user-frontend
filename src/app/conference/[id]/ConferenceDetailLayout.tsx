// src/app/conference/[id]/ConferenceDetailLayout.tsx

import styles from "./styles.module.css";
import StickyApplySection from "@/components/events/detail/StickyApplySection";
import EventInfoCard from "@/components/events/detail/EventInfoCard";
import Badge from "@/components/common/Badge";
import GlobeIcon from "@/assets/svg/globeIcon.svg";
import CursorIcon from "@/assets/svg/cursorIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";

export default function ConferenceDetailLayout() {
  return (
    <div className={styles.conferenceDetailLayout}>
      <StickyApplySection />
      <div className={styles.conferenceDetailContent}>
        <div className={styles.conferenceDetailContentItem}>
          <EventInfoCard title="행사 설명">asdf</EventInfoCard>
          <EventInfoCard title="모집 기간" isDate>
            <div className={styles.eventInfoCardContentDate}>
              <Text typography="body1_r_16" color="neutral-20">
                2025. 01. 01 ~ 2025. 01. 01
              </Text>
              <Badge label="N일 남았어요" />
            </div>
          </EventInfoCard>
          <EventInfoCard title="참가비">
            <div className={styles.eventInfoCardContentPrice}>
              <Text typography="body1_r_16" color="neutral-20">
                0원
              </Text>
              <Badge label="무료" />
            </div>
          </EventInfoCard>
          <EventInfoCard title="장소">
            <div className={styles.eventInfoCardContentPlaceList}>
              <div className={styles.eventInfoCardContentPlace}>
                <Image src={GlobeIcon} alt="globe icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  오프라인
                </Text>
              </div>
              <div className={styles.eventInfoCardContentPlace}>
                <Image src={CursorIcon} alt="cursor icon" />
                <Text typography="body1_r_16" color="neutral-20">
                  서울특별시 강남구 테헤란로 22길
                </Text>
                {/* TODO : 추후 네이버 지도 api 추가 */}
              </div>
            </div>
          </EventInfoCard>
        </div>
        <div className={styles.conferenceOtherEvent}>
          <Text typography="head3_m_24" color="black" as="h3">
            이런 행사는 어떠세요?
          </Text>
          <div className={styles.conferenceOtherEventList}></div>
        </div>
      </div>
    </div>
  );
}
