import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Flex from "@/components/common/Flex";
import styles from "./style.module.css";

// 아이콘 import
import SeminarIcon from "@/assets/icons/icon_seminar.svg";
import BootcampIcon from "@/assets/icons/icon_Education.svg";
import HackathonIcon from "@/assets/icons/icon_hackathon.svg";
import NetworkIcon from "@/assets/icons/icon_networking.svg";
import ArticleIcon from "@/assets/icons/icon_article.svg";

const menuItems = [
  { icon: SeminarIcon, label: "컨퍼런스·세미나", path: "/conference" },
  { icon: BootcampIcon, label: "부트캠프", path: "/bootcamp" },
  { icon: HackathonIcon, label: "동아리·해커톤·공모전", path: "/hackathon" },
  { icon: NetworkIcon, label: "네트워킹·멘토링", path: "/mentoring" },
  { icon: ArticleIcon, label: "아티클", path: "/article" },
];


export default function IconMenu() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <nav className={styles.iconMenu}>
      <Flex justify="center" gap="16px" as="ul">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={`${styles.menuItem} ${idx === activeIdx ? styles.active : ""}`}
            onClick={() => setActiveIdx(idx)}
          >
            <Link href={item.path} className={styles.link}>
              <Flex direction="column" justify="center" align="center" gap="4px">
                <Flex justify="center" align="center">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={40}
                    height={40}
                  />
                </Flex>
                <span>{item.label}</span>
              </Flex>
            </Link>
          </li>
        ))}
      </Flex>
    </nav>
  );
}