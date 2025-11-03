import styles from "./style.module.css";
import Button from "@/components/common/Button";

export default function NewsletterCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="cta-title">
      <div className={styles.inner}>
        {/* 좌측 텍스트 */}
        <div className={styles.texts}>
          <p className={styles.line1}>매주 놓치기 아까운 IT 행사</p>
          <h3 id="cta-title" className={styles.line2}>메일로 받아보세요</h3>
        </div>

        {/* 우측 버튼 + 아바타 말풍선 */}
        <div className={styles.right}>
          <Button className={styles.eventSendBtn}>행사 알림 받기 &gt;</Button>
        </div>
      </div>
    </section>
  );
}