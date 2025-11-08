// src/components/common/Pagination/index.tsx

import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import EllipsisIcon from "@/assets/svg/ellipsisIcon.svg";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "../Button";
import Dropdown, { DropdownOption } from "../Dropdown";
import Text from "../Text";
import Flex from "../Flex";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (option: DropdownOption) => void;
  goToPage?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  options,
  selected,
  onSelect,
  goToPage = true,
}: PaginationProps) => {
  const createPageList = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 3) {
      // Case: 1~3
      pages.push(1, 2, 3);
      pages.push("ellipsis");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Case: 8~10
      pages.push(1);
      pages.push("ellipsis");
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
    } else {
      // Case: 4~7
      pages.push("ellipsis");
      for (let i = currentPage; i < currentPage + 4 && i <= totalPages; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
    }

    return pages;
  };

  const pageList = createPageList();

  const handleLeftClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleRightClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <Flex gap="8px" className={styles.centerPagination}>
        <Flex gap="3.75rem" align="center">
          <button
            className={styles.paginationPageButton}
            onClick={handleLeftClick}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>

          <Flex gap="0.5rem" align="center">
            {pageList.map((item, idx) => {
              if (item === "ellipsis") {
                return (
                  <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                    <Image src={EllipsisIcon} alt="..." />
                  </span>
                );
              }

              return (
                <button
                  key={item}
                  className={`${styles.paginationButton} ${
                    currentPage === item ? styles.active : ""
                  }`}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </button>
              );
            })}
          </Flex>

          <button
            className={styles.paginationPageButton}
            onClick={handleRightClick}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </button>
        </Flex>
      </Flex>

      {goToPage && (
        <Flex align="center" gap="0.75rem" className={styles.paginationRight}>
          <Text typography="label2_m_16" color="neutral-30">
            Go to Page
          </Text>
          <Flex gap="0.25rem" align="center">
            <Dropdown
              options={options}
              selected={selected}
              onSelect={onSelect}
            />
            <Button variant="secondary" size="large">
              GO
            </Button>
          </Flex>
        </Flex>
      )}
    </div>
  );
};

export default Pagination;
