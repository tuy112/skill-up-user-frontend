// 추천 행사 - 지금 주목받고 있어요
import { useRef } from "react";
import Flex from "@/components/common/Flex";
import EventCard from "@/components/common/EventCard";
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";
import TabMenu from "@/components/common/Tab";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";

import { eventListMock } from "@/mocks/eventListMock";

export default function RecommendNow() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section className={`${globalStyles.recommend} ${localStyles.nowSection}`}>
      <Flex
        justify="space-between"
        align="flex-end"
        gap="40px"
        className={globalStyles.sectionHead}
      >
        <Flex direction="column">
          <p className={globalStyles.subTitle}>추천행사</p>
          <h2 className={globalStyles.title}>
            지금 <span className={globalStyles.titleSpan}>주목받고 있어요</span>
          </h2>
        </Flex>

        <TabMenu
          tabs={["전체", "기획", "디자인", "개발", "AI"]}
          defaultIndex={0}
          onChange={() => {}}
          theme="light"
        />
      </Flex>

      <div className={localStyles.nowTrackWrap}>
        <Flex gap="12px" className={localStyles.nowTrack} as="div">
          <div ref={trackRef} className={localStyles.nowTrackInner}>
            {eventListMock.map((item) => (
              <div key={item.id} className={localStyles.nowCard}>
                <EventCard size="large" event={item} />
              </div>
            ))}
          </div>
        </Flex>
      </div>

      <Flex align="center" justify="space-between" className={localStyles.bottomRow}>
        <Flex align="center" gap="12px">
          <button
            type="button"
            className={localStyles.arrowBtn}
            onClick={() => scroll("prev")}
            aria-label="이전"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${localStyles.arrowBtn} ${localStyles.darkBtn}`}
            onClick={() => scroll("next")}
            aria-label="다음"
          >
            <ChevronRightIcon />
          </button>
        </Flex>

        <Flex justify="center">
          <button className={localStyles.moreBtn}>최근 본 행사 더보기</button>
        </Flex>
      </Flex>
    </section>
  );
}