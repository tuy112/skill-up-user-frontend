// src/app/conference/layout.tsx

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function ConferenceLayout({
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
