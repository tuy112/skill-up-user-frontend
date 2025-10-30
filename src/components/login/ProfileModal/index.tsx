// src/components/login/ProfileModal/index.tsx

import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Text from "@/components/common/Text";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import BookmarkIcon from "@/assets/svg/bookmarkIcon.svg";
import PenIcon from "@/assets/svg/penIcon.svg";
import ChatIcon from "@/assets/svg/chatIcon.svg";

interface ProfileModalProps {
  isOpen: boolean;
  toggle: () => void;
  user: {
    name: string;
    email: string;
    profileImage: string;
  };
  triggerRef: React.RefObject<HTMLDivElement>;
}

export default function ProfileModal({
  isOpen,
  toggle,
  user,
  triggerRef,
}: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Escape 키로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, toggle]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggle, triggerRef]);

  // 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className={styles.profileModal} ref={modalRef}>
      <div className={styles.profileModalHeader}>
        <div className={styles.profileModalHeaderLeft}>
          <Image
            src={user.profileImage}
            alt="Logo Default Image"
            width={36}
            height={36}
          />
        </div>
        <div className={styles.profileModalHeaderRight}>
          <Text typography="sub3_m_16" color="black">
            {user.name}
          </Text>
          <Text typography="label4_m_12" color="neutral-50">
            {user.email}
          </Text>
        </div>
      </div>
      <div className={styles.profileModalContent}>
        <div className={styles.profileModalContentItem}>
          <div className={styles.profileModalContentItemTitle}>
            <Image src={BookmarkIcon} alt="Bookmark Icon" />
            <Text typography="label3_m_14" color="black">
              북마크
            </Text>
          </div>
          <div className={styles.profileModalContentItemContent}>
            <ChevronRightIcon />
          </div>
        </div>
        <div className={styles.profileModalContentItem}>
          <div className={styles.profileModalContentItemTitle}>
            <Image src={PenIcon} alt="Bookmark Icon" />
            <Text typography="label3_m_14" color="black">
              프로필 수정
            </Text>
          </div>
          <div className={styles.profileModalContentItemContent}>
            <ChevronRightIcon />
          </div>
        </div>
        <div className={styles.profileModalContentItem}>
          <div className={styles.profileModalContentItemTitle}>
            <Image src={ChatIcon} alt="Chat Icon" />
            <Text typography="label3_m_14" color="black">
              고객센터
            </Text>
          </div>
          <div className={styles.profileModalContentItemContent}>
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
