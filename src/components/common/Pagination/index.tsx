// src/components/common/Pagination/index.tsx

import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import EllipsisIcon from "@/assets/svg/ellipsisIcon.svg";
import styles from "./styles.module.css";
import Image from "next/image";
import Button from "../Button";
import Dropdown, { DropdownOption } from "../Dropdown";
import Text from "../Text";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  options: DropdownOption[];
  selected: DropdownOption;
  onSelect: (option: DropdownOption) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  options,
  selected,
  onSelect,
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
      <div className={styles.centerPagination}>
        <div className={styles.pageList}>
          <button
            className={styles.paginationPageButton}
            onClick={handleLeftClick}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </button>

          <div className={styles.pageItemList}>
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
          </div>

          <button
            className={styles.paginationPageButton}
            onClick={handleRightClick}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className={styles.paginationRight}>
        <Text typography="label2_m_16" color="neutral-30">
          Go to Page
        </Text>
        <div className={styles.paginationRightDropdown}>
          <Dropdown options={options} selected={selected} onSelect={onSelect} />
          <Button variant="secondary" size="large">
            GO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
