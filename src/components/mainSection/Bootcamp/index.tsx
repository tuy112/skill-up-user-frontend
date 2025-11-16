import EventCard from "@/components/common/EventCard";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import TabMenu from "@/components/common/Tab";
import { eventListMock } from "@/mocks/eventListMock";

export default function Bootcamp() {
  return (
    <section className={styles.bootcampSection} aria-labelledby="recent-title">
      <Flex direction="column" gap="40px" className={styles.inner}>
        <Flex justify="space-between" align="flex-end" gap="40px">
          <Flex direction="column">
            <p className={styles.subTitle}>부트캠프</p>
            <h2 id="rec-title" className={styles.title}>
              지금<span className={styles.titleSpan}>모집중인 부트캠프</span>
            </h2>
          </Flex>

          <TabMenu
            tabs={["전체", "기획", "디자인", "개발", "AI"]}
            defaultIndex={0}
            onChange={(tab) => console.log("선택된 탭:", tab)}
            theme="dark"
          />
        </Flex>

        <Flex wrap="wrap" gap="12px">
          {eventListMock.map((item) => (
            <EventCard key={item.id} size="medium" event={item} />
          ))}
        </Flex>

        <Flex justify="center">
          <button className={styles.moreBtn}>최근 본 행사 더보기</button>
        </Flex>
      </Flex>
    </section>
  );
}
