/* 
  작성자 : 김재혁
  최초 작성일 : 2025-08-21
  최종 수정일 : 2025-09-21
*/

"use client";

import React from "react";
import Link from "next/link";
import styles from "./style.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <h2>Site name</h2>
          </div>
          <ul className={styles.social}>
            <li><Link href="#">Facebook</Link></li>
            <li><Link href="#">LinkedIn</Link></li>
            <li><Link href="#">Youtube</Link></li>
            <li><Link href="#">Instagram</Link></li>
          </ul>
        </div>

        <div className={styles.footerBottom}></div>
      </div>
    </footer>
  );
}