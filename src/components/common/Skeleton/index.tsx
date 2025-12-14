// src/components/common/Skeleton/index.tsx

import clsx from "clsx";
import styles from "./styles.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  borderRadius = "0.5rem",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
