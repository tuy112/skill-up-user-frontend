import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import Button from "@/components/common/Button";
import Banner from "@/assets/images/middle_banner.jpg";

export default function HeroBanner() {
  return (
    <section className={styles.middleBanner} aria-label="메인 배너">
      <Image src={Banner} alt="비주얼 배너" fill priority />

      <div className={styles.overlay} />
      <Flex direction="column" justify="center" gap="12px" className={styles.inner}>
        <p className={styles.kicker}>FIGMA UTILIZES AI DESIGN TO INCREASE 100% EFFICIENCY</p>
        <h2 className={styles.title}>
          피그마, AI 디자인 활용해서<br/>
          <span>100%효율 높이기</span>
        </h2>
        <Button variant="secondary" size="extraLarge">자세히 알아보기 &gt;</Button>
      </Flex>
    </section>
  );
}