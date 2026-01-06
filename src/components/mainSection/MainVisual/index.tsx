"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import { useBanners } from "@/hooks/useHome";
import Banner from "@/assets/images/main_banner.jpg";
import Banner2 from "@/assets/images/main_banner2.png";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";

export default function MainVisual() {
  const [currentIndex, setCurrentIndex] = useState(1); // 무한 슬라이드: 초기값 1
  const [defaultBannerIndex, setDefaultBannerIndex] = useState(1); // 무한 슬라이드: 초기값 1
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDefaultTransitioning, setIsDefaultTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const defaultSliderRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useBanners();

  // 기본 배너 배열
  const defaultBanners = [Banner, Banner2];
  // 무한 슬라이드를 위한 복제: [마지막, 원본들, 첫번째]
  const extendedDefaultBanners = [
    defaultBanners[defaultBanners.length - 1],
    ...defaultBanners,
    defaultBanners[0],
  ];

  // displayOrder로 정렬
  const sortedBanners =
    data && data.homeBannerResponseList
      ? [...data.homeBannerResponseList].sort(
          (a, b) => a.displayOrder - b.displayOrder
        )
      : [];

  // 무한 슬라이드를 위한 복제: [마지막, 원본들, 첫번째]
  const extendedBanners =
    sortedBanners.length > 0
      ? [
          sortedBanners[sortedBanners.length - 1],
          ...sortedBanners,
          sortedBanners[0],
        ]
      : [];

  // 기본 배너 이전/다음 핸들러
  const handleDefaultPrev = () => {
    if (!isDefaultTransitioning) return;
    setDefaultBannerIndex((prev) => prev - 1);
  };

  const handleDefaultNext = () => {
    if (!isDefaultTransitioning) return;
    setDefaultBannerIndex((prev) => prev + 1);
  };

  // 기본 배너 자동 롤링 (3초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDefaultTransitioning) {
        setDefaultBannerIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isDefaultTransitioning]);

  // 기본 배너 transition 끝날 때 처리
  useEffect(() => {
    const slider = defaultSliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = () => {
      // 마지막 복제본에 도달했을 때 (첫번째 실제 배너로 점프)
      if (defaultBannerIndex === extendedDefaultBanners.length - 1) {
        setIsDefaultTransitioning(false);
        setDefaultBannerIndex(1);
      }
      // 첫번째 복제본에 도달했을 때 (마지막 실제 배너로 점프)
      if (defaultBannerIndex === 0) {
        setIsDefaultTransitioning(false);
        setDefaultBannerIndex(defaultBanners.length);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [
    defaultBannerIndex,
    defaultBanners.length,
    extendedDefaultBanners.length,
  ]);

  // API 배너 transition 끝날 때 처리
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || sortedBanners.length === 0) return;

    const handleTransitionEnd = () => {
      // 마지막 복제본에 도달했을 때 (첫번째 실제 배너로 점프)
      if (currentIndex === extendedBanners.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
      // 첫번째 복제본에 도달했을 때 (마지막 실제 배너로 점프)
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(sortedBanners.length);
      }
    };

    slider.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      slider.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, sortedBanners.length, extendedBanners.length]);

  // transition 상태 복원 (기본 배너)
  useEffect(() => {
    if (!isDefaultTransitioning) {
      setTimeout(() => {
        setIsDefaultTransitioning(true);
      }, 50);
    }
  }, [isDefaultTransitioning]);

  // transition 상태 복원 (API 배너)
  useEffect(() => {
    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [isTransitioning]);

  // 실제 페이지 번호 계산 (복제본 제외)
  const getActualIndex = (index: number, length: number) => {
    if (index === 0) return length;
    if (index === length + 1) return 1;
    return index;
  };

  // API 배너 핸들러
  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  // API 데이터가 없거나 로딩 중이거나 에러일 경우 기본 배너 표시
  if (
    isLoading ||
    error ||
    !data ||
    !data.homeBannerResponseList ||
    data.homeBannerResponseList.length === 0
  ) {
    return (
      <section id="mainVisual" className={styles.mainVisual}>
        <div className={styles.visualSlide}>
          <div
            ref={defaultSliderRef}
            className={styles.sliderTrack}
            style={{
              transform: `translateX(-${defaultBannerIndex * 100}%)`,
              transition: isDefaultTransitioning
                ? "transform 0.5s ease-in-out"
                : "none",
            }}
          >
            {extendedDefaultBanners.map((banner, index) => (
              <div key={`default-${index}`} className={styles.slideItem}>
                <Image
                  src={banner}
                  alt={`비주얼 배너 ${index}`}
                  fill
                  priority={index === 1}
                />
              </div>
            ))}
          </div>
          <Flex align="center" gap="12px" className={styles.paging}>
            <button onClick={handleDefaultPrev} className={styles.pagingButton}>
              <ChevronLeftIcon color="#fff" width={18} height={18} />
            </button>
            <Flex align="center" gap={0.1}>
              <Text typography="body2_r_14" color="white">
                {getActualIndex(defaultBannerIndex, defaultBanners.length)}
              </Text>
              <Text typography="body2_r_14" color="white">
                /
              </Text>
              <Text typography="body2_r_14" color="white">
                {defaultBanners.length}
              </Text>
            </Flex>

            <button onClick={handleDefaultNext} className={styles.pagingButton}>
              <ChevronRightIcon color="#fff" width={18} height={18} />
            </button>
          </Flex>
        </div>
      </section>
    );
  }

  return (
    <section id="mainVisual" className={styles.mainVisual}>
      <div className={styles.visualSlide}>
        <div
          ref={sliderRef}
          className={styles.sliderTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {extendedBanners.map((banner, index) => (
            <div key={`banner-${index}`} className={styles.slideItem}>
              <Image
                src={banner.bannerImageUrl}
                alt={banner.title}
                fill
                priority={index === 1}
              />
            </div>
          ))}
        </div>

        <Flex align="center" gap="12px" className={styles.paging}>
          <button onClick={handlePrev}>&lt;</button>
          <span className={styles.current}>
            {getActualIndex(currentIndex, sortedBanners.length)}
          </span>
          /<span>{sortedBanners.length}</span>
          <button onClick={handleNext}>&gt;</button>
        </Flex>
      </div>
    </section>
  );
}
