// src/app/conference/layout.tsx

import Header from "@/components/common/Header";

export default function ConferenceLayout({
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
