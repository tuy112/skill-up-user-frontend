// src/components/events/EventHeader/index.tsx

import styles from "./styles.module.css";
import Text from "@/components/common/Text";

export default function EventHeader({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className={styles.eventHeader}>
      <Text typography="head2_sb_30" color="black" as="h2">
        {title}
      </Text>
      <Text typography="body1_r_16" color="neutral-50">
        <Text typography="body1_r_16" color="primary-strong">
          {count}개
        </Text>
        의 행사가 있습니다.
      </Text>
    </div>
  );
}
