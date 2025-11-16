import React from "react";
import Image from "next/image";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";

import Banner from "@/assets/images/main_banner.jpg";

export default function MainVisual() {
  return (
    <section id="mainVisual" className={styles.mainVisual}>
      <div className={styles.visualSlide}>
        <Image src={Banner} alt="비주얼 배너" fill priority />

        <Flex align="center" gap="12px" className={styles.paging}>
          <button>&lt;</button>
          <span className={styles.current}>1</span>/<span>3</span>
          <button>&gt;</button>
        </Flex>
      </div>
    </section>
  );
}