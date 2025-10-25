// 지금 주목받고 있어요
import EventCard from "@/components/common/Card";
import { dummyEvents } from "../recommend-deadline/dummyData";
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";

export default function RecommendNow() {
  return (
    <section className={`${globalStyles.recommend} ${localStyles.nowSection}`}>
      <div className={globalStyles.sectionHead}>
        <div className={globalStyles.titles}>
          <p className={globalStyles.subTitle}>추천행사</p>
          <h2 className={globalStyles.title}>
            지금 <span className={globalStyles.titleSpan}>주목받고 있어요</span>
          </h2>
        </div>

        {/* 탭 메뉴 */}
        <div className={globalStyles.tabWrap}>
          <div className={globalStyles.tabMenu}>
            <input type="radio" id="tab1" name="tab" defaultChecked />
            <label htmlFor="tab1">전체</label>

            <input type="radio" id="tab2" name="tab" />
            <label htmlFor="tab2">기획</label>

            <input type="radio" id="tab3" name="tab" />
            <label htmlFor="tab3">디자인</label>

            <input type="radio" id="tab4" name="tab" />
            <label htmlFor="tab4">개발</label>

            <input type="radio" id="tab5" name="tab" />
            <label htmlFor="tab5">AI</label>
          </div>
        </div>
      </div>

      <div className={globalStyles.cardList}>
        {dummyEvents.map((item) => (
          <EventCard key={item.id} size="large" {...item} />
        ))}
      </div>

      <div className={localStyles.moreBox}>
        <button className={localStyles.moreBtn}>IT 인기 행사 더보기</button>
      </div>
    </section>
  );
}