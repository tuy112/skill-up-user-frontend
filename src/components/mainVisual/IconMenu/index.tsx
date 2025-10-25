import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";

// 아이콘 import
import SeminarIcon from "@/assets/icons/icon_seminar.png";
import BootcampIcon from "@/assets/icons/icon_Education.png";
import HackathonIcon from "@/assets/icons/icon_hackathon.png";
import NetworkIcon from "@/assets/icons/icon_networking.png";
import ArticleIcon from "@/assets/icons/icon_article.png";

const menuItems = [
  { icon: SeminarIcon, label: "컨퍼런스·세미나" },
  { icon: BootcampIcon, label: "부트캠프" },
  { icon: HackathonIcon, label: "동아리·해커톤·공모전" },
  { icon: NetworkIcon, label: "네트워킹·멘토링" },
  { icon: ArticleIcon, label: "아티클" },
];

export default function IconMenu() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <nav className={styles.iconMenu}>
      <ul>
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={idx === activeIdx ? styles.active : ""}
            onClick={() => setActiveIdx(idx)}
          >
            <div className={styles.iconBox}>
              <Image src={item.icon} alt={item.label} width={40} height={40} />
            </div>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}