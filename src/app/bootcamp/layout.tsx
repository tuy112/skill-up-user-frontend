// src/app/bootcamp/layout.tsx

import Header from "@/components/common/Header";

export default function BootcampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header variant="sub" />
      {children}
    </div>
  );
}
