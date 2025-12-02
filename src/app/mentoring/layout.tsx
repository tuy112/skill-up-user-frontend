// src/app/mentoring/layout.tsx

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function MentoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="sub" />
      {children}
      <Footer />
    </>
  );
}
