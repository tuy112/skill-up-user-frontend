// src/components/events/sorting/SortDropdown/index.tsx

"use client";

import { useState } from "react";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";

const sortOptions: DropdownOption[] = [
  { label: "인기순", value: "popular" },
  { label: "최신등록순", value: "recent" },
  { label: "모집마감순", value: "deadline" },
];

export default function SortDropdown() {
  const [selected, setSelected] = useState(sortOptions[0]);

  // TODO: 정렬에 맞춰 API 호출 or 상태 갱신
  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
  };

  return (
    <Dropdown
      options={sortOptions}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}
