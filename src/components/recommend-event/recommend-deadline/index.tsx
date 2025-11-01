// 신청 마감 행사
import EventCard from "@/components/common/Card";
import { dummyEvents } from "./dummyData";
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";

export default function RecommendDeadline() {
  // 데이터가 많아도 4개만 출력
  const deadlineEvents = dummyEvents
    .map((event) => ({ ...event, dday: "모집마감" }))
    .slice(0, 4);

  return (
    <section className={localStyles.deadlineSection}>
      <div className={localStyles.inner}>
        {/* 텍스트 영역 */}
        <div className={localStyles.textBox}>
          <p className={globalStyles.subEng}>SEE THE LIVE REVIEWS OF THE EVENT</p>
          <h2 className={globalStyles.interestTitle}>
            곧 신청 마감되는 <span className={globalStyles.interestSpan}>행사</span>예요
          </h2>
        </div>

        {/* 카드 리스트 */}
        <div className={localStyles.cardListWrap}>
          <div className={globalStyles.cardList}>
            {deadlineEvents.map((item) => (
              <EventCard key={item.id} {...item} size="middle" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}