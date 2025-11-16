// 추천 콘텐츠
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import TabMenu from "@/components/common/Tab";

type Card = {
  id: string;
  title: string;
  desc: string;
  tag?: string;
  date?: string;
};

const mock: Card[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `rec-${i}`,
  title: "메인타이틀",
  desc: "서브타이틀이 들어가면 좋겠어요 서브타이틀이 들어가면 좋아요",
  tag: "툴스",
  date: "2020.01.01",
}));

export default function RecommendedContent() {
  return (
    <section className={styles.RecommendContent} aria-labelledby="rec-title">
      <Flex justify="space-between" align="flex-end" gap="40px" className={styles.sectionHead}>
        <Flex direction="column">
          <p className={styles.subTitle}>추천 콘텐츠</p>
          <h2 id="rec-title" className={styles.title}>
            실무자를 위한 <span className={styles.titleSpan}>추천 컨텐츠</span>
          </h2>
        </Flex>

        <TabMenu
          tabs={["전체", "기획", "디자인", "개발", "AI"]}
          defaultIndex={2}
          onChange={(tab) => console.log("선택된 탭:", tab)}
          theme="light"
        />
      </Flex>

      <div className={styles.cardList}>
        {mock.map((card, idx) => (
          <Flex
            key={card.id}
            direction="column"
            className={`${styles.card} ${idx === 0 ? styles.heroCard : ""}`}
            as="article"
          >
            <div
              className={`${styles.thumb} ${idx === 0 ? styles.heroThumb : ""}`}
            />

            <div className={styles.meta}>
              <Flex align="center" gap="12px">
                <div className={styles.cardTitle}>{card.title}</div>
                <Flex align="center" gap="8px" style={{ flexShrink: 0 }}>
                  <span className={styles.badge}>{card.tag ?? "출처"}</span>
                  <span className={styles.date}>{card.date}</span>
                </Flex>
              </Flex>

              <p className={styles.cardDesc} title={card.desc}>
                {card.desc}
              </p>
            </div>
          </Flex>
        ))}
      </div>

      <Flex justify="center">
        <button className={styles.moreBtn}>아티클 더보기</button>
      </Flex>
    </section>
  );
}
