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
import Button from "../Button";
import IconButton from "../IconButton";
import UserIcon from "@/assets/icons/UserIcon";
import SearchIcon from "@/assets/svg/searchIcon.svg";
import ProfileModal from "@/components/login/ProfileModal";
import LogoDefaultImg from "@/assets/images/logoDefaultImg.png";
import Alert from "../Alert";
import { useAuth } from "@/hooks/useAuth";
import { getSocialLogin } from "@/api/auth";

interface HeaderProps {
  variant: "main" | "sub";
}

export default function Header({ variant }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const { isAuthenticated, logout } = useAuth();

  // 클라이언트 마운트 체크 (Hydration 깜빡임 방지)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleProfileModal = () => setIsProfileModalOpen((prev) => !prev);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toggleAlert = () => setIsAlertOpen((prev) => !prev);

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
      // 소셜 로그인 URL 가져오기
      const response = await getSocialLogin(pendingSocialType.toLowerCase());

      // 응답에서 URL 추출 (data 필드에 URL이 포함되어 있음)
      if (response.code === "SUCCESS" && response.data) {
        // "SOCIAL_LOGIN_TYPE : https://..." 형식에서 URL만 추출
        const url = response.data.includes(":")
          ? response.data.split(": ")[1]
          : response.data;

        // 소셜 로그인 페이지로 리다이렉트
        window.location.href = url;
      }

      // 모달은 닫지 않음 (리다이렉트되면서 페이지가 이동됨)
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
              <Image src={SearchIcon} alt="search" width={20} height={20} />
            </button>
          </div>
          {isMounted && isAuthenticated && (
            <div
              className={styles.profileBtnWrap}
              onClick={(e) => {
                e.stopPropagation();
              }}
              ref={profileBtnRef}
            >
              <IconButton
                variant="opacity"
                size="large"
                onClick={toggleProfileModal}
                icon={<UserIcon />}
              />
              <div className={styles.profileBtnContent}>
                <ProfileModal
                  isOpen={isProfileModalOpen}
                  toggle={toggleProfileModal}
                  user={{
                    name: "홍길동",
                    email: "skillup@gmail.com",
                    profileImage: LogoDefaultImg.src.toString(),
                  }}
                  triggerRef={profileBtnRef as RefObject<HTMLDivElement>}
                />
              </div>
            </div>
          )}

          {isMounted && (
            <>
              {!isAuthenticated ? (
                <Button
                  variant="secondary"
                  size="large"
                  onClick={() => setIsModalOpen(true)}
                >
                  로그인 · 회원가입
                </Button>
              ) : (
                <Button variant="secondary" size="large" onClick={toggleAlert}>
                  로그아웃
                </Button>
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

      <Alert
        isOpen={isAlertOpen}
        toggle={toggleAlert}
        title="로그아웃 하시겠습니까?"
        message="로그아웃하면 일부 기능을 이용할 수 없습니다."
        onConfirm={handleLogout}
      />
    </header>
  );
}
