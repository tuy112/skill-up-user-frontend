// 관심있어하실 행사
import globalStyles from "../style.module.css";
import localStyles from "./style.module.css";
import { FaRegBookmark } from "react-icons/fa";
import Button from "@/components/common/Button";

export default function RecommendInterest() {
  const keywords = [
    "#기획",
    "#디자인",
    "#AI",
    "#개발",
    "#마케팅",
    "#교육",
    "#데이터",
  ];

  return (
    <section className={localStyles.interestSection}>
      <div className={localStyles.inner}>
        {/* 왼쪽 텍스트 */}
        <div className={localStyles.leftBox}>
          <p className={globalStyles.subEng}>
            HERE’S AN EVENT YOU MIGHT BE INTERESTED IN
          </p>
          <h2 className={globalStyles.interestTitle}>
            <span className={globalStyles.interestSpan}>관심있어하실</span> 
            행사를<br/> 골라왔어요
          </h2>

          <div className={localStyles.keywordBox}>
            {keywords.map((kw, i) => (
              <button key={i} className={localStyles.keywordBtn}>
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽 카드 2x2 */}
        <div className={localStyles.cardGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={localStyles.card}>
              <div className={localStyles.imgBox}>
                <Button
                  variant="secondary"
                  opacity={0.6}
                  icon={<FaRegBookmark />}
                  className={localStyles.bookmarkBtn}
                />
              </div>
              <div className={localStyles.textBox}>
                <h3 className={localStyles.metaTitle}>메인타이틀</h3>
                <p className={localStyles.metaDesc}>
                  서브타이틀이 들어가면 좋겠어요
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}