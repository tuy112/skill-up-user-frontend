// src/components/common/TabBar/index.tsx

import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";

interface TabItem {
  label: string;
  count?: number;
}

interface TabBarProps {
  tabs: TabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function TabBar({ tabs, activeIndex, onChange }: TabBarProps) {
  return (
    <Flex justify="center">
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <Flex
            key={index}
            as="button"
            align="center"
            gap={0.5}
            className={clsx(styles.tab, isActive && styles.active)}
            onClick={() => onChange(index)}
          >
            <Text typography="sub3_m_16" color="black">
              {tab.label}
            </Text>
            {typeof tab.count === "number" && (
              <Text typography="sub3_m_16" color="primary-strong">
                {tab.count}
              </Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}
