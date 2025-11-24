"use client";

import React, { RefObject, useRef, useState, useEffect } from "react";
import Image from "next/image";
import SkillUpWhiteLogo from "@/assets/svg/skillUp_white.svg";
import SkillUpBlackLogo from "@/assets/svg/skillUp_black.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

import EventCategoryTabs from "@/components/common/Header/EventCategoryTabs";
import Button from "../Button";
import IconButton from "../IconButton";
import UserIcon from "@/assets/icons/UserIcon";
import SearchIcon from "@/assets/svg/searchIcon.svg";
import ProfileModal from "@/components/login/ProfileModal";
import LogoDefaultImg from "@/assets/images/logoDefaultImg.png";
import Alert from "../Alert";
import { useAuth } from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";

import SearchOverlay from "@/components/search/SearchOverlay";

interface HeaderProps {
  variant: "main" | "sub";
}

export default function Header({ variant }: HeaderProps) {
  const router = useRouter();

  const { isAuthenticated, logout } = useAuth();
  const { mutate: loginMutate, isPending: isLoginPending } = useLogin();

  // 클라이언트 마운트 체크 (Hydration 깜빡임 방지)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 검색어 기능 (최대 50자)
  const [headerKeyword, setHeaderKeyword] = useState("");

  // 테스트 로그인 핸들러 : 추후 소셜로 변경필요
  const handleTestLogin = () => {
    loginMutate();
  };

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const toggleProfileModal = () => setIsProfileModalOpen((prev) => !prev);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toggleAlert = () => setIsAlertOpen((prev) => !prev);

  const profileBtnRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
  };

  // 검색 오버레이 on / off!!!
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
              maxLength={50}                         
              onFocus={() => setIsSearchOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setIsSearchOpen(true);
              }}
            />
            <button
              className={styles.searchBtn}
              onClick={() => setIsSearchOpen(true)}
              aria-label="검색 열기"
            >
              <Image src={SearchIcon} alt="search" width={20} height={20} />
            </button>
          </div>

        {/* 검색 오버레이 */}
        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

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
                  onClick={handleTestLogin}
                  disabled={isLoginPending}
                >
                  {isLoginPending ? "로그인 중..." : "로그인 · 회원가입"}
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

      {/* <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <LoginContent />
      </Modal> */}
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
