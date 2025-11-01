// src/components/events/detail/EventInfoCard/index.tsx

import styles from "./styles.module.css";
import Image from "next/image";
import CalendarIcon from "@/assets/svg/calendarIcon.svg";
import Text from "@/components/common/Text";

export default function EventInfoCard({
  children,
  title,
  isDate = false,
}: {
  children: React.ReactNode;
  title: string;
  isDate?: boolean;
}) {
  return (
    <div className={styles.eventInfoCard}>
      <div className={styles.eventInfoCardHeader}>
        <div className={styles.eventInfoCardTitle}>
          <div className={styles.eventInfoDivider} />
          <Text typography="sub1_m_20" color="gray-scale-900" as="h3">
            {title}
          </Text>
        </div>
        {isDate && (
          <Image src={CalendarIcon} alt={title} width={24} height={24} />
        )}
      </div>

      <div className={styles.eventInfoCardContent}>{children}</div>
    </div>
  );
}
