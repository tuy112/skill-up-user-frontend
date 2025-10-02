import Link from "next/link";
import styles from "./style.module.css";

export default function RecommendEvent() {
  return (
    <section className={styles.recommend}>
        <div className={styles.head}>
            <div className={styles.titles}>
                <p className={styles.subTitle}>추천행사</p>
                <h2 className={styles.title}>지금 <strong>주목받고 있어요</strong></h2>
            </div>

            {/* 탭 메뉴 */}
            <ul className={styles.tabMenu}>
                <li><button className={styles.active}>전체</button></li>
                <li><button>기획</button></li>
                <li><button>디자인</button></li>
                <li><button>개발</button></li>
                <li><button>AI</button></li>
            </ul>
        </div>

        {/* 카드 리스트 */}
        <div className={styles.cardList}>
            {[1, 2, 3, 4].map((item) => (
            <div key={item} className={styles.card}>
                <div className={styles.imgBox}>마감 D-N</div>
                <div className={styles.cardBody}>
                <span className={styles.category}>카테고리</span>
                <h3 className={styles.cardTitle}>
                    요즘 핫한 행사! 요즘 핫한 행사!
                </h3>
                <p className={styles.date}>2025.01.01 - 2025.01.01</p>
                <p className={styles.place}>서울특별시 강남구 테헤란로 22길</p>
                <p className={styles.price}>88,888원 ~</p>
                <Link href="#" className={styles.detailBtn}>
                    자세히 보기
                </Link>
                </div>
            </div>
            ))}
      </div>

      <div className={styles.moreBox}>
        <button className={styles.moreBtn}>IT 인기 행사 더보기</button>
      </div>
    </section>
  );
}