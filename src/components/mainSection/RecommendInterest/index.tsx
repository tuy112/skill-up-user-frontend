// src/components/mainSection/RecommendInterest/index.tsx

// 관심있어하실 행사
"use client";
import { useState } from "react";
import Flex from "@/components/common/Flex";
import styles from "./styles.module.css";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import IconButton from "@/components/common/IconButton";
import Text from "@/components/common/Text";
import LoginImage from "@/assets/images/loginImg.png";

export default function RecommendInterest() {
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<number>>(
    new Set()
  );

  const handleBookmarkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const keywords = [
    "#기획",
    "#디자인",
    "#AI",
    "#개발",
    "#마케팅",
    "#교육",
    "#데이터",
  ];

  return (
    <section className={styles.interestSection}>
      <Flex
        justify="space-between"
        align="flex-start"
        gap="3.75rem"
        className={styles.inner}
      >
        <Flex direction="column" gap="1.5rem">
          <Flex direction="column" gap="1rem">
            <Text typography="label1_r_18" color="neutral-95">
              HERE&apos;S AN EVENT YOU MIGHT BE INTERESTED IN
            </Text>
            <Flex direction="column">
              <Flex gap="0.5rem">
                <Text typography="head5_sb_42" color="white">
                  관심있어하실
                </Text>
                <Text typography="head1_m_42" color="white">
                  행사를
                </Text>
              </Flex>
              <Text typography="head1_m_42" color="white">
                골라왔어요
              </Text>
            </Flex>
          </Flex>

          <Flex wrap="wrap" gap="0.5rem" className={styles.keywordBox}>
            {keywords.map((kw, i) => (
              <button
                key={i}
                type="button"
                className={styles.keywordBtn}
                aria-label={`${kw} 카테고리 필터`}
              >
                {kw}
              </button>
            ))}
          </Flex>
        </Flex>

        <div className={styles.cardGrid}>
          {Array.from({ length: 4 }).map((_, i) => {
            const isBookmarked = bookmarkedCards.has(i);
            return (
              <Flex key={i} direction="column" gap="0.5rem">
                <div className={styles.imgBox}>
                  <img src={LoginImage.src.toString()} alt="Login Image" />
                  <IconButton
                    variant="opacity"
                    size="large"
                    icon={
                      <BookmarkIcon
                        fillColor={isBookmarked ? "var(--Common-white)" : "none"}
                        strokeColor={
                          isBookmarked ? "none" : "var(--Common-white)"
                        }
                      />
                    }
                    onClick={(e) => handleBookmarkClick(e, i)}
                    className={styles.bookmarkBtn}
                  />
                </div>
                <Flex direction="column">
                  <Text
                    typography="head4_sb_20"
                    color="white"
                    className={styles.metaText}
                  >
                    메인타이틀
                  </Text>
                  <Text
                    typography="body1_r_16"
                    color="neutral-95"
                    className={styles.metaText}
                  >
                    서브타이틀이 들어가면 좋겠어요
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </div>
      </Flex>
    </section>
  );
}
