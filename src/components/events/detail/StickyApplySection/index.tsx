// src/components/events/detail/StickyApplySection/index.tsx

import Button from "@/components/common/Button";
import styles from "./styles.module.css";
import LoginImage from "@/assets/images/loginImg.png";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import DollarIcon from "@/assets/svg/dollarIcon.svg";
import Image from "next/image";

export default function StickyApplySection() {
  return (
    <div className={styles.stickyApplySection}>
      <div className={styles.stickyApplySectionContent}>
        <div className={styles.stickyApplySectionContentHeader}>
          <div className={styles.stickyApplySectionContentHeaderTitle}>
            <span>컨퍼런스 · 세미나</span>
            <h3>2025 제1회 AI 테크 컨퍼런스 AI 테크 컨퍼런스</h3>
          </div>
          <div className={styles.stickyApplySectionContentHeaderImage}>
            <Image
              src={LoginImage}
              alt="Login Image"
              width={284}
              height={160}
            />
          </div>
        </div>
        <div className={styles.stickyApplySectionContentBody}>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={CalendarIcon} alt="Calendar Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <span>행사 기간</span>
              <p>2025.01.01 ~ 2025.01.01</p>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={LocationIcon} alt="Location Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <span>장소</span>
              <p>서울특별시 강남구 테헤란로 22길</p>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={DollarIcon} alt="Dollar Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <span>참가비</span>
              <p>50,000원 ~</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.stickyApplyButtonList}>
        <Button variant="primary" size="extraLarge">
          신청하기
        </Button>
        <Button variant="outlined" size="extraLarge">
          북마크에 추가
        </Button>
      </div>
      <div className={styles.stickyApplySectionFooter}>
        <div className={styles.stickyApplySectionFooterItem}>
          <div className={styles.circle} />
          <span>문의</span>
        </div>
        <p className={styles.stickyApplySectionFooterPhoneNumber}>
          010-1234-1234
        </p>
      </div>
    </div>
  );
}
