/* 
  작성자 : 김재혁
  최초 작성일 : 2025-08-21
  최종 수정일 : 2025-09-29
*/
import React from "react";
import Image from "next/image";
import SkillUpLogo from "@/assets/svg/skillUp_white.svg";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import styles from "./style.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 로고 + Nav 메뉴바 */}
        <h1 className={styles.logo}>
          <Link href="/">
            <Image
              src={SkillUpLogo}      
              alt="스킬업 메인 로고"
              width={120}        
              height={18}
              priority
            />
          </Link>
        </h1>

        {/* 검색창, 로그인, 회원가입 메뉴바 */}
        <div className={styles.topMenu}>
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className={styles.searchBox}
            />
            <button className={styles.searchBtn}>
              <FiSearch size={18} color={"c4c4c4"} />
            </button>
          </div>
          <button className={styles.loginBtn}>로그인 · 회원가입</button>
        </div>
      </div>
    </header>
  );
}