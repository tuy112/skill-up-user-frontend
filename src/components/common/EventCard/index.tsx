// src/components/common/EventCard/index.tsx
"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import Badge from "@/components/common/Badge";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Text from "@/components/common/Text";
import IconButton from "@/components/common/IconButton";
import Button from "@/components/common/Button";
import { Event } from "@/types/event/event";

interface EventCardProps {
  size: "small" | "medium" | "large" | "block";
  event: Event;
  block?: boolean;
}

export default function EventCard({ size, event, block }: EventCardProps) {
  const { id, title, date, place, price, category, url, image, badgeLabel } =
    event;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      onClick={() => router.push(url || "/")}
      className={`${styles.eventCard} ${
        size === "large"
          ? styles.large
          : size === "medium"
          ? styles.medium
          : size === "small"
      } ${block ? styles.block : ""}`}
    >
      <div className={styles.eventCardImage}>
        {/* 목업 이미지 */}
        <Image src={image} alt="Event Card Image" fill priority />

        <div className={styles.eventCardImageOverlay}>
          <Badge label={badgeLabel || ""} variant="opacity" />
          <IconButton
            variant="opacity"
            size="large"
            icon={<BookmarkIcon isBookmarked={isBookmarked} />}
            onClick={handleBookmarkClick}
          />
        </div>
      </div>
      <div className={styles.eventCardContent}>
        <div className={styles.eventCardContentBody}>
          <div className={styles.eventCardContentBodyItem}>
            <Badge label={category} />
            {size === "large" || size === "small" ? (
              <Text
                typography="head3_m_24"
                color="black"
                as="h3"
                className={styles.eventCardContentBodyItemTitle}
              >
                {title}
              </Text>
            ) : (
              <Text
                typography="sub1_m_20"
                color="black"
                as="h3"
                className={styles.eventCardContentBodyItemTitleMedium}
              >
                {title}
              </Text>
            )}
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
        {(size === "large" || size === "medium") && (
          <div className={styles.eventCardContentFooter}>
            <div className={styles.eventCardContentFooterItem}>
              <Text typography="sub2_m_18" color="black">
                {price}
              </Text>
              {price === "0원" && <Badge label="무료" />}
            </div>
            {size === "large" && (
              <Button
                variant="secondary"
                size="medium"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(url || "/");
                }}
              >
                자세히 보기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
