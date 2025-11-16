import { useRef } from "react";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import Button from "@/components/common/Button";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";

type Card = { id: string; title: string; desc: string; img?: string };

const cards: Card[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `club-${i}`,
  title: "타이틀입니다. 타이틀입니다.",
  desc: "상세설명이 들어가요 상세설명이 들어가요 상...",
}));

export default function ClubChallenge() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section className={styles.challengeSection} aria-labelledby="club-title">
      <Flex justify="space-between" align="center" gap="40px" className={styles.sectionHead}>
        <Flex direction="column" gap="4px">
          <p className={styles.subTitle}>동아리 · 해커톤 · 공모전</p>
          <h2 id="club-title" className={styles.title}>
            바로 도전 가능한 <span className={styles.titleSpan}>동아리·해커톤·공모전</span>
          </h2>
        </Flex>

        <Flex align="center" gap="12px">
          <button type="button" className={styles.arrowBtn} onClick={() => scroll("prev")} aria-label="이전">
            <ChevronLeftIcon />
          </button>
          <button type="button" className={`${styles.arrowBtn} ${styles.dark}`} onClick={() => scroll("next")} aria-label="다음">
            <ChevronRightIcon />
          </button>
        </Flex>
      </Flex>

      <div className={styles.trackWrap}>
        <Flex gap="24px" className={styles.track} style={{ display: 'flex' }} as="div">
          <div ref={trackRef} className={styles.trackInner}>
            {cards.map((c) => (
              <article key={c.id} className={styles.card}>
                <div className={styles.thumb} />
                <Flex align="flex-end" gap="12px" className={styles.overlay}>
                  <Flex direction="column" gap="6px" className={styles.texts}>
                    <div className={styles.cardTitle}>{c.title}</div>
                    <p className={styles.cardDesc}>{c.desc}</p>
                  </Flex>
                  <Button size="small" variant="secondary">자세히 보기</Button>
                </Flex>
              </article>
            ))}
          </div>
        </Flex>
      </div>
    </section>
  );
}