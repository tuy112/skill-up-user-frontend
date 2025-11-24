import { useState, useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import BackIcon from "@/assets/svg/Vector.svg";
import SearchIcon from "@/assets/svg/searchIcon.svg";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [keyword, setKeyword] = useState("");
    const [recents, setRecents] = useState([
      { id: "1", text: "최근에검색한" },
      { id: "2", text: "최근에검색한" },
      { id: "3", text: "최근에검색한" },
      { id: "4", text: "최근에검색한" },
      { id: "5", text: "최근에검색한" },
    ]);
  
    useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 0); }, [isOpen]);
    if (!isOpen) return null;
  
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {/* 상단 타이틀 라인 */}
          <div className={styles.titleRow}>
            <button className={styles.backBtn} onClick={onClose} aria-label="뒤로">
              <Image src={BackIcon} alt="" width={9} height={16} />
            </button>
            <h2 className={styles.title}>어떤 행사를 찾아볼까요?</h2>
          </div>
  
          {/* 검색 바 */}
          <div className={styles.searchBox}>
            <input
              ref={inputRef}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              maxLength={50}
              placeholder="행사명, 주제, 장소 등을 검색해보세요"
              aria-label="검색어 입력"
            />
            <button className={styles.searchBtn} aria-label="검색">
              <Image src={SearchIcon} alt="" width={20} height={20} />
            </button>
          </div>
  
          {/* 최근 검색어 */}
          <div className={styles.recentHead}>
            <span className={styles.recentTitle}>최근 검색어</span>
            <button className={styles.clearAll} onClick={() => setRecents([])}>모두 삭제</button>
          </div>
          <div className={styles.recentList}>
            {recents.map((r) => (
              <span key={r.id} className={styles.chip}>
                {r.text}
                <button className={styles.chipClose} aria-label={`${r.text} 삭제`}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
}