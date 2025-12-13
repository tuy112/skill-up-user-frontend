// src/components/common/Text/index.tsx

import styles from "./styles.module.css";
import { JSX } from "react";

interface TextProps {
  children: React.ReactNode;
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  typography:
    | "head1_b_42"
    | "head1_m_42"
    | "head2_sb_30"
    | "head3_m_24"
    | "head4_sb_20"
    | "head5_sb_42"
    | "sub1_m_20"
    | "sub2_m_18"
    | "sub3_m_16"
    | "body1_r_16"
    | "body2_r_14"
    | "label1_r_18"
    | "label2_m_16"
    | "label3_m_14"
    | "label4_m_12";

  color?:
    | "white"
    | "black"
    | "neutral-5"
    | "neutral-10"
    | "neutral-15"
    | "neutral-20"
    | "neutral-30"
    | "neutral-40"
    | "neutral-50"
    | "neutral-60"
    | "neutral-70"
    | "neutral-80"
    | "neutral-90"
    | "neutral-95"
    | "neutral-99"
    | "line-normal"
    | "line-neutral"
    | "primary-light"
    | "primary-strong"
    | "primary-normal"
    | "primary-extra-light"
    | "primary-heavy"
    | "fill-strong"
    | "fill-normal"
    | "error-normal"
    | "gray-scale-900";
}

export default function Text({
  children,
  as = "span",
  className,
  typography,
  color,
}: TextProps) {
  const Component = as as keyof JSX.IntrinsicElements;
  return (
    <Component
      className={`${styles.text} ${className || ""} ${styles[typography]} ${
        color ? styles[color as keyof typeof styles] : ""
      }`}
    >
      {children}
    </Component>
  );
}
