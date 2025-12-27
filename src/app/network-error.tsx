"use client";

import Header from "@/components/common/Header";
import ErrorPage from "@/components/common/Error/ErrorPage";
import Footer from "@/components/common/Footer";

export default function NetworkError() {
  return (
    <div id="wrap">
      <Header variant="sub" />
      <ErrorPage type="network" />
      <Footer />
    </div>
  );
}
