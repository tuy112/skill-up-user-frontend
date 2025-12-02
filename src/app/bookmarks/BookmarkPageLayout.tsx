// src/app/bookmarks/BookmarkPageLayout.tsx

"use client";

import EventCard from "@/components/common/EventCard";
import styles from "./styles.module.css";
import ProfileCard from "@/components/myPage/bookmarks/ProfileCard";
import Pagination from "@/components/common/Pagination";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";
import TabBar from "@/components/common/TabBar";
import { Event } from "@/types/event";
import Flex from "@/components/common/Flex";

const sortOptions: DropdownOption[] = [
  { label: "마감임박순", value: "deadline" },
  { label: "최근 북마크순", value: "recent" },
];

export default function BookmarkPageLayout({
  eventList,
}: {
  eventList: Event[];
}) {
  return (
    <Flex gap={1} className={styles.container}>
      {/* 목업 데이터 */}
      <ProfileCard
        name="홍길동"
        email="skillup@gmail.com"
        job="개발자"
        bookmarkCount={3}
      />
      <Flex direction="column" gap={6.25}>
        <Flex direction="column" gap={1.25}>
          <Flex align="center" justify="space-between">
            <TabBar
              tabs={[
                { label: "진행 중", count: 10 },
                { label: "종료", count: 10 },
              ]}
              activeIndex={0}
              onChange={(index) => {
                console.log(index);
              }}
            />
            <Dropdown
              options={sortOptions}
              selected={sortOptions[0]}
              onSelect={(option) => {
                console.log(option);
              }}
            />
          </Flex>
          <div className={styles.cardList}>
            {eventList.map((event) => (
              <EventCard key={event.id} size="medium" event={event} />
            ))}
          </div>
        </Flex>
        <Pagination
          currentPage={1}
          totalPages={10}
          onPageChange={() => {}}
          options={[]}
          selected={{ label: "1", value: "1" }}
          onSelect={(option) => {
            console.log(option);
          }}
          goToPage={false}
        />
      </Flex>
    </Flex>
  );
}
