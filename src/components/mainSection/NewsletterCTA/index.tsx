import Flex from "@/components/common/Flex";
import styles from "./style.module.css";
import Button from "@/components/common/Button";

export default function NewsletterCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-title">
      <Flex align="center" justify="space-between" gap="40px" className={styles.inner}>
        <Flex direction="column" gap="6px">
          <p className={styles.line1}>매주 놓치기 아까운 IT 행사</p>
          <h3 id="cta-title" className={styles.line2}>메일로 받아보세요</h3>
        </Flex>
        <Button className={styles.eventSendBtn}>행사 알림 받기 &gt;</Button>
      </Flex>
    </section>
  );
}