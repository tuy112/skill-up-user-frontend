// src/components/events/EventCard/index.tsx

import styles from "./styles.module.css";
import Image from "next/image";
import LoginImage from "@/assets/images/loginImg.png";
import Badge from "@/components/common/Badge";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import { BookmarkIcon } from "./icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Text from "@/components/common/Text";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  place: string;
  price: string;
  category: string;
}

export default function EventCard({
  id,
  title,
  date,
  place,
  price,
  category,
}: EventCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      onClick={() => router.push(`/conference/${id}`)}
      className={styles.eventCard}
    >
      <div className={styles.eventCardImage}>
        {/* 목업 이미지 */}
        <Image src={LoginImage} alt="Event Card Image" fill priority />

        <div className={styles.eventCardImageOverlay}>
          <Badge label="무료" variant="secondary" />
          {/* TODO : 추후 버튼 공통 컴포넌트로 변경 예정 */}
          <button
            className={styles.eventCardImageOverlayButton}
            onClick={handleBookmarkClick}
          >
            {/* TODO : 북마크 활성화 아이콘 추가 예정 */}
            <BookmarkIcon
              className={`${styles.bookmarkIcon} ${
                isBookmarked ? styles.bookmarkIconActive : ""
              }`}
              isBookmarked={isBookmarked}
            />
          </button>
        </div>
      </div>
      <div className={styles.eventCardContent}>
        <div className={styles.eventCardContentBody}>
          <div className={styles.eventCardContentBodyItem}>
            <Badge label={category} />
            <Text
              typography="sub1_m_20"
              color="black"
              as="h3"
              className={styles.eventCardContentBodyItemTitle}
            >
              {title}
            </Text>
          </div>
          <div className={styles.eventCardContentBodyDatePlace}>
            <div className={styles.eventCardContentBodyDatePlaceItem}>
              <Image src={CalendarIcon} alt="Calendar Icon" />
              <Text
                typography="body2_r_14"
                color="neutral-40"
                className={styles.eventCardContentBodyDatePlaceItemText}
              >
                {date}
              </Text>
            </div>
            <div className={styles.eventCardContentBodyDatePlaceItem}>
              <Image src={LocationIcon} alt="Location Icon" />
              <Text
                typography="body2_r_14"
                color="neutral-40"
                className={styles.eventCardContentBodyDatePlaceItemText}
              >
                {place}
              </Text>
            </div>
          </div>
        </div>
        <div className={styles.eventCardContentFooter}>
          <div className={styles.eventCardContentFooterItem}>
            <Text typography="sub2_m_18" color="black">
              {price}
            </Text>
            <Badge label="무료" />
          </div>
        </div>
      </div>
    </div>
  );
}
