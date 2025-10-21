// src/components/events/detail/StickyApplySection/index.tsx

import Button from "@/components/common/Button";
import styles from "./styles.module.css";
import LoginImage from "@/assets/images/loginImg.png";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import DollarIcon from "@/assets/svg/dollarIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import Badge from "@/components/common/Badge";

export default function StickyApplySection() {
  return (
    <div className={styles.stickyApplySection}>
      <div className={styles.stickyApplySectionContent}>
        <div className={styles.stickyApplySectionContentHeader}>
          <div className={styles.stickyApplySectionContentHeaderTitle}>
            <Text typography="label3_m_14" color="primary-strong">
              컨퍼런스 · 세미나
            </Text>
            <Text typography="head3_m_24" color="black">
              2025 제1회 AI 테크 컨퍼런스 AI 테크 컨퍼런스
            </Text>
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
              <Text typography="label3_m_14" color="neutral-60">
                행사 기간
              </Text>
              <Text typography="body1_r_16" color="neutral-20">
                2025.01.01 ~ 2025.01.01
              </Text>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={LocationIcon} alt="Location Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <Text typography="label3_m_14" color="neutral-60">
                장소
              </Text>
              <Text typography="body1_r_16" color="neutral-20">
                서울특별시 강남구 테헤란로 22길
              </Text>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItem}>
            <Image src={DollarIcon} alt="Dollar Icon" />
            <div className={styles.stickyApplySectionContentBodyItemDate}>
              <Text typography="label3_m_14" color="neutral-60">
                참가비
              </Text>
              <Text typography="body1_r_16" color="neutral-20">
                50,000원 ~
              </Text>
            </div>
          </div>
          <div className={styles.stickyApplySectionContentBodyItemDivider} />
          <div className={styles.stickyApplySectionContentBodyItem}>
            {/* TODO : 뱃지 컴포넌트 나오면 수정 */}
            <Badge label="#기획자" />
            <Badge label="#AI개발" />
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
          <Text typography="label3_m_14" color="neutral-60">
            문의
          </Text>
        </div>
        <Text typography="body2_r_14" color="neutral-20">
          010-1234-1234
        </Text>
      </div>
    </div>
  );
}
