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
import Flex from "@/components/common/Flex";
import { Event } from "@/types/event";
import { EVENT_CATEGORY_LABEL } from "@/constants/event";

interface EventCardProps {
  size: "small" | "medium" | "large" | "block";
  event: Event;
  block?: boolean;
}

export default function EventCard({ size, event, block }: EventCardProps) {
  const {
    id,
    title,
    scheduleText,
    locationText,
    priceText,
    category,
    thumbnailUrl,
    d_dayLabel,
    bookmarked,
  } = event;
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const router = useRouter();
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // 이미지 URL이 없으면 placeholder 사용
  const imageSrc = thumbnailUrl || "/images/placeholder-event.png";
  const eventUrl = `/conference/${id}`;

  const categoryBadgeLabel = EVENT_CATEGORY_LABEL[category] || "";

  return (
    <Flex
      direction="column"
      gap="1rem"
      onClick={() => router.push(eventUrl)}
      className={`${styles.eventCard} ${
        size === "large"
          ? styles.large
          : size === "medium"
          ? styles.medium
          : size === "small"
      } ${block ? styles.block : ""}`}
    >
      <div className={styles.eventCardImage}>
        {/* 추후 바뀔 수도 있음 */}
        <img src={imageSrc} alt="Event Card Image" />

        <Flex justify="space-between" className={styles.eventCardImageOverlay}>
          <Badge label={d_dayLabel || ""} variant="opacity" />
          <IconButton
            variant="opacity"
            size="large"
            icon={
              <BookmarkIcon
                fillColor={isBookmarked ? "var(--Common-white)" : "none"}
                strokeColor={
                  isBookmarked ? "var(--Common-black)" : "var(--Common-white)"
                }
              />
            }
            onClick={handleBookmarkClick}
          />
        </Flex>
      </div>
      <Flex direction="column" gap="1rem" style={{ padding: "0 1rem" }}>
        <Flex direction="column" gap="0.75rem">
          <Flex direction="column" gap="0.25rem">
            <Badge label={categoryBadgeLabel} />
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
          </Flex>
          <Flex direction="column" gap="0.12rem">
            <Flex align="center" gap="0.5rem">
              <Image src={CalendarIcon} alt="Calendar Icon" />
              <Text
                typography="body2_r_14"
                color="neutral-40"
                className={styles.eventCardContentBodyDatePlaceItemText}
              >
                {scheduleText}
              </Text>
            </Flex>
            <Flex align="center" gap="0.5rem">
              <Image src={LocationIcon} alt="Location Icon" />
              <Text
                typography="body2_r_14"
                color="neutral-40"
                className={styles.eventCardContentBodyDatePlaceItemText}
              >
                {locationText}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {(size === "large" || size === "medium") && (
          <Flex justify="space-between">
            <Flex align="center" gap="0.5rem">
              <Text typography="sub2_m_18" color="black">
                {priceText}
              </Text>
              {priceText === "0원" && <Badge label="무료" />}
            </Flex>
            {size === "large" && (
              <Button
                variant="secondary"
                size="medium"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(eventUrl);
                }}
              >
                자세히 보기
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
