import EventCard from "@/components/common/EventCard";
import styles from "./style.module.css";
import TabMenu from "@/components/common/Tab";
import { eventListMock } from "@/mocks/eventListMock";

export default function Bootcamp() {
  // 데이터가 많아도 4개만 출력
  return (
    <section className={styles.bootcampSection} aria-labelledby="recent-title">
      <div className={styles.inner}>
        <div className={styles.sectionHead}>
          <div className={styles.titles}>
            <p className={styles.subTitle}>부트캠프</p>
            <h2 id="rec-title" className={styles.title}>
              지금<span className={styles.titleSpan}>모집중인 부트캠프</span>
            </h2>
          </div>

          {/* 탭 메뉴 */}
          <TabMenu
            tabs={["전체", "기획", "디자인", "개발", "AI"]}
            defaultIndex={0}
            onChange={(tab) => console.log("선택된 탭:", tab)}
            theme="dark"
          />
        </div>

        {/* 카드 리스트 */}
        <div className={styles.cardList}>
          {eventListMock.map((item) => (
            <EventCard key={item.id} size="medium" event={item} />
          ))}
        </div>

        <div className={styles.moreBox}>
          <button className={styles.moreBtn}>최근 본 행사 더보기</button>
        </div>
      </div>
    </section>
  );
}
