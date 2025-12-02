// src/components/login/TermsAgreementContent/index.tsx
"use client";

import styles from "./style.module.css";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import { PRIVACY_POLICY } from "@/constants/terms";

interface TermsAgreementContentProps {
  onConfirm: () => void;
}

export default function TermsAgreementContent({
  onConfirm,
}: TermsAgreementContentProps) {
  const renderContent = (
    content: string | { type: "list"; items: string[] } | { type: "table"; headers: string[]; rows: string[][] }
  ) => {
    if (typeof content === "string") {
      return (
        <Text typography="body2_r_14" color="neutral-60" key={content}>
          {content}
        </Text>
      );
    }

    if (content.type === "list") {
      return (
        <ul className={styles.termsList} key="list">
          {content.items.map((item, idx) => (
            <li key={idx}>
              <Text typography="body2_r_14" color="neutral-60">
                {item.split("\n").map((line, lineIdx) => (
                  <span key={lineIdx}>
                    {line}
                    {lineIdx < item.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </Text>
            </li>
          ))}
        </ul>
      );
    }

    if (content.type === "table") {
      return (
        <table className={styles.termsTable} key="table">
          <thead>
            <tr>
              {content.headers.map((header, idx) => (
                <th key={idx}>
                  <Text typography="label3_m_14" color="neutral-80">
                    {header}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>
                    <Text typography="body2_r_14" color="neutral-60">
                      {cell}
                    </Text>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div className={styles.termsContent}>
      <div className={styles.termsContentHeader}>
        <Text typography="head4_sb_20" color="black">
          개인정보 처리방침
        </Text>
      </div>

      <div className={styles.termsContentContent}>
        <div className={styles.termsContentItem}>
          {PRIVACY_POLICY.map((section, idx) => (
            <div key={idx} className={styles.termsSection}>
              {section.title && (
                <div className={styles.termsSectionTitle}>
                  <Text typography="sub3_m_16" color="black">
                    {section.title}
                  </Text>
                </div>
              )}
              <div className={styles.termsSectionContent}>
                {section.content.map((item, itemIdx) => (
                  <div key={itemIdx} className={styles.termsContentParagraph}>
                    {renderContent(item)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.termsContentBottom}>
        <Button variant="secondary" size="extraLarge" onClick={onConfirm} block>
          확인했어요
        </Button>
      </div>
    </div>
  );
}
