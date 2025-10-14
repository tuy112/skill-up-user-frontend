// src/app/mentoring/layout.tsx

import Header from "@/components/common/Header";

export default function MentoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="sub" />
      {children}
    </>
  );
}
