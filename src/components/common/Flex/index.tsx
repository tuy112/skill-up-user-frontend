// src/components/common/Flex/index.tsx

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: string | number;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  "aria-label"?: string;
}

export default function Flex({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap,
  as: Component = "div",
  className = "",
  style = {},
  onClick,
  onMouseEnter,
  onMouseLeave,
  "aria-label": ariaLabel,
}: FlexProps) {
  const flexStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    gap: typeof gap === "number" ? `${gap}rem` : gap,
    ...style,
  };

  return (
    <Component
      className={clsx(styles.flex, className)}
      style={flexStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}
