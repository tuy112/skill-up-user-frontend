// src/components/events/filters/RoleSelector/index.tsx

"use client";

import styles from "./styles.module.css";
import { RoleOption } from "../types/role";
import {
  GearOutlineIcon,
  LightBulbOutlineIcon,
  OverlapShapeOutlineIcon,
  SparkleBlobOutlineIcon,
} from "./icons";

interface RoleSelectorProps {
  selected: RoleOption[];
  onSelect: (option: RoleOption[]) => void;
}

const ROLES: {
  key: RoleOption;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "전체", label: "전체", icon: undefined },
  { key: "기획", label: "기획", icon: LightBulbOutlineIcon },
  { key: "디자인", label: "디자인", icon: OverlapShapeOutlineIcon },
  { key: "개발", label: "개발", icon: GearOutlineIcon },
  { key: "AI", label: "AI", icon: SparkleBlobOutlineIcon },
];

export default function RoleSelector({
  selected = ["전체"],
  onSelect,
}: RoleSelectorProps) {
  const handleClick = (role: RoleOption) => {
    if (role === "전체") {
      onSelect(["전체"]);
      return;
    }

    let newSelected: RoleOption[] = selected.filter((r) => r !== "전체");

    if (newSelected.includes(role)) {
      newSelected = newSelected.filter((r) => r !== role);
    } else {
      newSelected = [...newSelected, role];
    }

    if (newSelected.length === 0) {
      newSelected = ["전체"];
    }

    onSelect(newSelected);
  };

  const isActive = (role: RoleOption) => {
    if (!selected) return false;
    if (role === "전체") return selected.includes("전체");
    return selected.includes(role);
  };

  return (
    <div className={styles.roleSelector}>
      {ROLES.map((role) => (
        <button
          key={role.key}
          onClick={() => handleClick(role.key)}
          className={`${styles.roleSelectorButton} ${
            isActive(role.key) ? styles.active : ""
          }`}
        >
          {role.icon && (
            <role.icon
              className={`${styles.icon} ${
                isActive(role.key) ? styles.iconActive : ""
              }`}
            />
          )}
          <span>{role.label}</span>
        </button>
      ))}
    </div>
  );
}
