/* 
  작성자 : 김재혁
  최초 작성일 : 2025-08-21
  최종 수정일 : 2025-10-08
*/
"use client";

import React, { useState } from "react";
import Image from "next/image";
import SkillUpWhiteLogo from "@/assets/svg/skillUp_white.svg";
import SkillUpBlackLogo from "@/assets/svg/skillUp_black.svg";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import styles from "./style.module.css";
import Modal from "../Modal";
import LoginContent from "@/components/login/LoginContent";
import EventCategoryTabs from "@/components/nav/EventCategoryTabs";

interface HeaderProps {
  variant: "main" | "sub";
}

export default function Header({ variant }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header
      className={
        styles.header +
        " " +
        (variant === "main" ? styles.mainHeader : styles.subHeader)
      }
    >
      <div className={styles.inner}>
        {/* 로고 + Nav 메뉴바 */}
        <div className={styles.logoNavMenu}>
          <Link href="/">
            {variant === "main" ? (
              <Image
                src={SkillUpWhiteLogo}
                alt="스킬업 메인 로고"
                width={120}
                height={18}
                priority
              />
            ) : (
              <Image
                src={SkillUpBlackLogo}
                alt="스킬업 서브 로고"
                width={120}
                height={18}
                priority
              />
            )}
          </Link>
          {variant === "sub" && (
            <div className={styles.navMenu}>
              <EventCategoryTabs />
            </div>
          )}
        </div>

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
          <button onClick={openModal} className={styles.loginBtn}>
            로그인 · 회원가입
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <LoginContent />
      </Modal>
    </header>
  );
}
