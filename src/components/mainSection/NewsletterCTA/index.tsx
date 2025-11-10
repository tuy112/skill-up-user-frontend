import styles from "./style.module.css";
import Button from "@/components/common/Button";

export default function NewsletterCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-title">
      <div className={styles.inner}>
        <div className={styles.texts}>
          <p className={styles.line1}>매주 놓치기 아까운 IT 행사</p>
          <h3 id="cta-title" className={styles.line2}>메일로 받아보세요</h3>
        </div>
        <Button className={styles.eventSendBtn}>행사 알림 받기 &gt;</Button>
      </div>
    </section>
  );
}