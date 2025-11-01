/* 
  작성자 : 김재혁
  최초 작성일 : 2025-08-21
  최종 수정일 : 2025-10-25
*/

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";

import SkillUpLogo from "@/assets/svg/skillUp_white.svg";
import { Search, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* 왼쪽 영역 */}
        <div className={styles.leftBlock}>
          <div className={styles.topRow}>
            <div className={styles.logoWrap}>
              <Image src={SkillUpLogo} alt="Skill Up 로고" width={140} height={19.76} />
            </div>
            <div className={styles.policyGroup}>
              <Link href="/faq">자주 묻는 질문</Link>
              <Link href="/terms">서비스이용약관</Link>
              <Link href="/privacy">개인정보처리방침</Link>
            </div>
          </div>

          <div className={styles.bottomRow}>
            <p className={styles.email}>skillup01.official@gmail.com</p>
            <p className={styles.copy}>ⓒ 2025 Skill UP. All rights reserved.</p>
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className={styles.rightBlock}>
          <div className={styles.iconGroup}>
            <Link href="/search" className={styles.iconBtn} aria-label="검색">
              <Search size={24} />
            </Link>
            <Link href="https://www.instagram.com/skill_up._/" target="_blank" className={styles.iconBtn} aria-label="인스타그램">
              <Instagram size={24} />
            </Link>
            <Link href="mailto:skillup01.official@gmail.com" className={styles.iconBtn} aria-label="이메일">
              <Mail size={24} />
            </Link>
          </div>
          <Link href="/submit" className={styles.submitBtn}>
            행사 제보하기 &gt;
          </Link>
        </div>
      </div>
    </footer>
  );
}