import React from "react";
import { MdOutlineScreenShare, MdOutlineMic, MdEmojiEvents, MdMenuBook } from "react-icons/md";
import { FiTool } from "react-icons/fi";
import { TbNetwork } from "react-icons/tb";
import { AiOutlineFileText } from "react-icons/ai";
import styles from "./style.module.css";

const menuItems = [
  { icon: <MdOutlineScreenShare size={28} />, label: "세미나" },
  { icon: <MdOutlineMic size={28} />, label: "컨퍼런스" },
  { icon: <MdEmojiEvents size={28} />, label: "공모전" },
  { icon: <MdMenuBook size={28} />, label: "교육" },
  { icon: <FiTool size={28} />, label: "해커톤" },
  { icon: <TbNetwork size={28} />, label: "네트워킹" },
  { icon: <AiOutlineFileText size={28} />, label: "아티클" },
];

export default function IconMenu() {
  return (
    <nav className={styles.iconMenu}>
      <ul>
        {menuItems.map((item, idx) => (
          <li key={idx}>
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}