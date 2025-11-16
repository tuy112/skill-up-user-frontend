// 지금 주목받고 있어요
// import { useState } from "react";
import Flex from "@/components/common/Flex";
import EventCard from "@/components/common/EventCard";
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";
import TabMenu from "@/components/common/Tab";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { eventListMock } from "@/mocks/eventListMock";

export default function RecommendNow() {
  // const PAGE_SIZE = 4;
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.max(1, Math.ceil(eventListMock.length / PAGE_SIZE));

  const prev = () => {
    console.log("이전");
  };
  const next = () => {
    console.log("다음");
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

      <Flex wrap="wrap" gap="12px" className={globalStyles.cardList}>
        {eventListMock.map((item) => (
          <EventCard key={item.id} size="large" event={item} />
        ))}
      </Flex>

      <Flex
        align="center"
        justify="space-between"
        className={localStyles.bottomRow}
      >
        <Flex align="center" gap="20px">
          <button
            type="button"
            className={`${localStyles.arrowBtn} ${localStyles.lightBtn}`}
            onClick={prev}
            aria-label="이전"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={`${localStyles.arrowBtn} ${localStyles.darkBtn}`}
            onClick={next}
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
