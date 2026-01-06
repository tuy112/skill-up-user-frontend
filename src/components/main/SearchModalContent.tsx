// src/components/main/SearchModalContent.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import styles from "./styles.module.css";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import DeleteIcon from "@/assets/icons/DeleteIcon";

interface SearchModalContentProps {
  onClose: () => void;
}

export default function SearchModalContent({
  onClose,
}: SearchModalContentProps) {
  const [inputValue, setInputValue] = useState("");
  const { searches, addSearch, removeSearch, clearAll } = useRecentSearches();
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addSearch(inputValue);
      // 검색 결과 페이지로 이동
      router.push(`/search?q=${encodeURIComponent(inputValue)}`);
      // 모달 닫기
      onClose();
      setInputValue("");
    }
  };

  const handleRecentSearchClick = (search: string) => {
    addSearch(search);
    // 검색 결과 페이지로 이동
    router.push(`/search?q=${encodeURIComponent(search)}`);
    // 모달 닫기
    onClose();
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      className={styles.searchModalContent}
    >
      <Flex direction="column" gap={0.75} block>
        <Flex justify="space-between">
          <Flex align="center" gap={0.25}>
            <ChevronLeftIcon />
            <Text typography="head4_sb_20" color="black">
              어떤 행사를 찾아볼까요?
            </Text>
          </Flex>
          <button type="button" onClick={onClose}>
            <DeleteIcon />
          </button>
        </Flex>

        <form onSubmit={handleSearch} style={{ width: "100%" }}>
          <Flex gap={0.75} className={styles.searchModalContentInput}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              className={styles.searchModalContentInputInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className={styles.searchModalContentInputButton}
            >
              <SearchIcon />
            </button>
          </Flex>
        </form>
      </Flex>
      <Flex direction="column" gap={1} block>
        <Flex justify="space-between">
          <Text typography="sub2_m_18" color="black">
            최근 검색어
          </Text>
          {searches.length > 0 && (
            <button
              type="button"
              className={styles.searchModalContentClearButton}
              onClick={clearAll}
            >
              <Text typography="sub3_m_16" color="neutral-60">
                모두 삭제
              </Text>
            </button>
          )}
        </Flex>
        <Flex wrap="wrap" gap={0.5} block>
          {searches.length > 0 ? (
            searches.map((search) => (
              <button
                key={search}
                type="button"
                className={styles.searchModalContentRecentSearchButton}
                onClick={() => handleRecentSearchClick(search)}
              >
                <Text
                  typography="sub3_m_16"
                  color="neutral-60"
                  className={styles.searchModalContentRecentSearchText}
                >
                  {search}
                </Text>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(search);
                  }}
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  <CloseIcon />
                </div>
              </button>
            ))
          ) : (
            <Flex
              direction="column"
              justify="center"
              align="center"
              block
              className={styles.searchModalContentRecentSearchEmpty}
            >
              <Text typography="label2_m_16" color="neutral-40">
                최근 검색어가 없습니다
              </Text>
              <Text typography="body2_r_14" color="neutral-70">
                키워드, 관련 검색어, 유형으로 검색해보세요
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
