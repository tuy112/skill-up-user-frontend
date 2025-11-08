// src/app/support/SupportPageLayout.tsx

"use client";
import { useState, useMemo } from "react";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Accordion from "@/components/common/Accordion";
import Flex from "@/components/common/Flex";
import { faqData } from "./faqData";
import Pagination from "@/components/common/Pagination";
import { DropdownOption } from "@/components/common/Dropdown";

// 임의로 3개씩 보여주기
const ITEMS_PER_PAGE = 3;

export default function SupportPageLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageOption, setSelectedPageOption] = useState<DropdownOption>({
    label: "1",
    value: "1",
  });

  const totalPages = Math.ceil(faqData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFAQs = faqData.slice(startIndex, endIndex);

  // 페이지 옵션 생성
  const pageOptions = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedPageOption({ label: `${page}`, value: `${page}` });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownSelect = (option: DropdownOption) => {
    setSelectedPageOption(option);
    const page = parseInt(option.value);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Flex direction="column" gap={4} className={styles.content}>
      <Text typography="head2_sb_30" color="black" as="h1">
        고객센터
      </Text>

      <div className={styles.faqSection}>
        <Accordion items={currentFAQs} defaultOpenId={currentFAQs[0]?.id} />
      </div>

      {totalPages > 1 && (
        <Flex justify="center" style={{ marginTop: "2rem" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            options={pageOptions}
            selected={selectedPageOption}
            onSelect={handleDropdownSelect}
            goToPage={false}
          />
        </Flex>
      )}
    </Flex>
  );
}
