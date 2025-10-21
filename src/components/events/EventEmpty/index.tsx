// src/components/events/EventEmpty/index.tsx

import CautionIcon from "@/assets/svg/cautionIcon.svg";
import Image from "next/image";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";

interface EventEmptyProps {
  title: string;
  url: string;
}

export default function EventEmpty({ title, url }: EventEmptyProps) {
  const router = useRouter();

  return (
    <div className={styles.eventCardListEmpty}>
      <div className={styles.eventCardListEmptyTitle}>
        <Image src={CautionIcon} alt="Caution Icon" />
        <Text typography="sub2_m_18" color="neutral-30">
          {title}에 등록된 행사가 없어요
        </Text>
      </div>
      <Button
        variant="secondary"
        size="medium"
        onClick={() => router.push(url)}
        icon={<ChevronRightIcon />}
      >
        행사 등록하기
      </Button>
    </div>
  );
}
