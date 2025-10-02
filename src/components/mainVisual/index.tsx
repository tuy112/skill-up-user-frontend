import React from "react";
import Image from "next/image";
import styles from "./style.module.css";

import Banner from "@/assets/images/main_banner.jpg";

export default function MainVisual() {
  return (
    <section id="mainVisual" className={styles.mainVisual}>
      <div className={styles.visualSlide}>
        <Image src={Banner} alt="비주얼 배너" fill priority />

        {/* 페이징 버튼 */}
        <div className={styles.paging}>
          <button>&lt;</button>
          <span className={styles.current}>1</span>/<span>3</span>
          <button>&gt;</button>
        </div>
      </div>
    </section>
  );
}