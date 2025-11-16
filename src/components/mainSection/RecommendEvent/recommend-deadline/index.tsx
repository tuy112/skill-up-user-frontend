// 신청 마감 행사
import Flex from "@/components/common/Flex";
import EventCard from "@/components/common/EventCard";
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";
import { eventListMock } from "@/mocks/eventListMock";

export default function RecommendDeadline() {
  return (
    <section className={localStyles.deadlineSection}>
      <Flex direction="column" gap="40px" className={localStyles.inner}>
        <Flex direction="column" gap="8px">
          <p className={globalStyles.subEng}>
            SEE THE LIVE REVIEWS OF THE EVENT
          </p>
          <h2 className={globalStyles.interestTitle}>
            곧 신청 마감되는{" "}
            <span className={globalStyles.interestSpan}>행사</span>예요
          </h2>
        </Flex>

        <Flex wrap="wrap" gap="12px" className={globalStyles.cardList}>
          {eventListMock.map((item) => (
            <EventCard key={item.id} size="medium" event={item} />
          ))}
        </Flex>
      </Flex>
    </section>
  );
}
