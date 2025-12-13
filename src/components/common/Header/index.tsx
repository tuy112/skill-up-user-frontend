"use client";

import React, { RefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import SkillUpWhiteLogo from "@/assets/svg/skillUp_white.svg";
import SkillUpBlackLogo from "@/assets/svg/skillUp_black.svg";
import Link from "next/link";
import styles from "./styles.module.css";
import Modal from "../Modal";
import LoginContent, { SocialType } from "@/components/login/LoginContent";
import TermsAgreementContent from "@/components/login/TermsAgreementContent";
import EventCategoryTabs from "@/components/common/Header/EventCategoryTabs";

import SearchIcon from "@/assets/svg/searchIcon.svg";
import ProfileModal from "@/components/login/ProfileModal";
import LogoDefaultImg from "@/assets/images/logoDefaultImg.png";
import { useAuth } from "@/hooks/useAuth";
import { getSocialLogin } from "@/api/auth";
import { useAtomValue } from "jotai";
import { userNameAtom, userEmailAtom } from "@/store/authAtoms";
import { useUserEmailAndName } from "@/hooks/useUser";
import Text from "../Text";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";

interface HeaderProps {
  variant: "main" | "sub";
}

export default function Header({ variant }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const { isAuthenticated, logout } = useAuth();

  // 로그인 상태일 때 유저 이메일/이름 자동 조회 (백그라운드 업데이트)
  useUserEmailAndName();

  const userName = useAtomValue(userNameAtom);
  const userEmail = useAtomValue(userEmailAtom);

  // 클라이언트 마운트 체크 (Hydration 깜빡임 방지)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleProfileModal = () => setIsProfileModalOpen((prev) => !prev);

  // 약관 동의 모달 상태
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [pendingSocialType, setPendingSocialType] = useState<SocialType | null>(
    null
  );

  const profileBtnRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
  };

  const handleSocialLoginClick = (socialType: SocialType) => {
    setPendingSocialType(socialType);
    setIsTermsModalOpen(true);
  };

  const handleTermsConfirm = async () => {
    if (!pendingSocialType) return;

    try {
      const response = await getSocialLogin(pendingSocialType.toLowerCase());

      // 응답에서 URL 추출 (data 필드에 URL이 포함되어 있음)
      if (response.code === "SUCCESS" && response.data) {
        const url = response.data.includes(":")
          ? response.data.split(": ")[1]
          : response.data;

        window.location.href = url;
      }
    } catch (error) {
      console.error("소셜 로그인 실패:", error);
      // 에러 발생 시에만 모달 닫기
      setIsTermsModalOpen(false);
      setPendingSocialType(null);
    }
  };

  const handleTermsCancel = () => {
    setIsTermsModalOpen(false);
    setPendingSocialType(null);
  };

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
          {variant === "sub" && <EventCategoryTabs />}
        </div>

        {/* 검색창, 로그인, 회원가입 메뉴바 */}
        <div className={styles.topMenu}>
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className={styles.searchBox}
              id="searchInput"
            />
            <button className={styles.searchBtn}>
              <Image src={SearchIcon} alt="search" width={20} height={20} />
            </button>
          </div>
          <button className={styles.inquiryBtn}>
            <Text typography="label3_m_14" color="fill-normal">
              문의하기
            </Text>
          </button>

          {isMounted && (
            <>
              {!isAuthenticated ? (
                <button
                  className={styles.loginBtn}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Text typography="label3_m_14" color="fill-normal">
                    로그인 · 회원가입
                  </Text>
                </button>
              ) : (
                <div className={styles.profileBtnWrap} ref={profileBtnRef}>
                  <button
                    className={styles.profileBtn}
                    onClick={toggleProfileModal}
                  >
                    <Text typography="label3_m_14" color="fill-normal">
                      {userName}
                    </Text>
                    <ChevronDownIcon />
                  </button>
                  <div className={styles.profileBtnContent}>
                    <ProfileModal
                      isOpen={isProfileModalOpen}
                      toggle={toggleProfileModal}
                      user={{
                        name: userName || "",
                        email: userEmail || "",
                        profileImage: LogoDefaultImg.src.toString(),
                      }}
                      triggerRef={profileBtnRef as RefObject<HTMLDivElement>}
                      handleLogout={handleLogout}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <LoginContent
          onSocialLoginClick={handleSocialLoginClick}
          onLoginSuccess={toggleModal}
        />
      </Modal>

      {/* 약관 동의 모달 (로그인 모달과 독립적으로 렌더링) */}
      <Modal isOpen={isTermsModalOpen} toggle={handleTermsCancel}>
        <TermsAgreementContent onConfirm={handleTermsConfirm} />
      </Modal>
    </header>
  );
}
