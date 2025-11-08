// src/components/common/Accordion/index.tsx

"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";

interface AccordionItemProps {
  id: string;
  question: string;
  answerTitle: string;
  answerDetail: string;
  isOpen?: boolean;
  onToggle?: (id: string) => void;
}

export function AccordionItem({
  id,
  question,
  answerTitle,
  answerDetail,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className={`${styles.item} ${isOpen ? styles.open : ""}`}>
      <Flex
        as="button"
        justify="space-between"
        align="center"
        className={styles.question}
        onClick={() => onToggle?.(id)}
        aria-label={question}
      >
        <Flex align="center" gap="1rem" style={{ flex: 1 }}>
          <Text typography="head3_m_24" color="neutral-30" as="span">
            Q
          </Text>
          <Text typography="sub2_m_18" color="black">
            {question}
          </Text>
        </Flex>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Flex>
      {isOpen && (
        <Flex gap="1rem" style={{ marginTop: "1.5rem", paddingLeft: "0.25rem" }}>
          <Text typography="head3_m_24" color="primary-strong" as="span">
            A
          </Text>
          <Flex direction="column" align="flex-start" gap="0.75rem" style={{ flex: "1 0 0" }}>
            <Text typography="sub2_m_18" color="black">
              {answerTitle}
            </Text>
            <Text typography="body2_r_14" color="neutral-30">
              {answerDetail}
            </Text>
          </Flex>
        </Flex>
      )}
    </div>
  );
}

interface AccordionProps {
  items: Array<{
    id: string;
    question: string;
    answerTitle: string;
    answerDetail: string;
  }>;
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export default function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <Flex direction="column" className={styles.accordion}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answerTitle={item.answerTitle}
          answerDetail={item.answerDetail}
          isOpen={openIds.includes(item.id)}
          onToggle={handleToggle}
        />
      ))}
    </Flex>
  );
}
