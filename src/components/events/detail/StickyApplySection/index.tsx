// src/components/events/detail/StickyApplySection/index.tsx

import Button from "@/components/common/Button";
import styles from "./styles.module.css";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import LocationIcon from "@/assets/svg/locationIcon.svg";
import DollarIcon from "@/assets/svg/dollarIcon.svg";
import Image from "next/image";
import Text from "@/components/common/Text";
import Badge from "@/components/common/Badge";

interface StickyApplySectionProps {
  category: string;
  title: string;
  date: string;
  place: string;
  price: string;
  phoneNumber: string;
  image: string;
}

export default function StickyApplySection({
  category,
  title,
  date,
  place,
  price,
  phoneNumber,
  image,
}: StickyApplySectionProps) {
  return (
    <div className={styles.stickyApplySection}>
      <div className={styles.stickyApplySectionContent}>
        <div className={styles.stickyApplySectionContentHeader}>
          <div className={styles.stickyApplySectionContentHeaderTitle}>
            <Text typography="label3_m_14" color="primary-strong">
              {category}
            </Text>
            <Text typography="head3_m_24" color="black">
              {title}
            </Text>
          </div>
          <div className={styles.stickyApplySectionContentHeaderImage}>
            <Image src={image} alt="Login Image" width={284} height={160} />
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
                {date}
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
                {place}
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
                {price}
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
          {phoneNumber}
        </Text>
      </div>
    </div>
  );
}
