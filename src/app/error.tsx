"use client";

import Header from "@/components/common/Header";
import ErrorPage from "@/components/common/Error/ErrorPage";

export default function GlobalError() {
  return (
    <>
      <Header variant="sub" />
      <ErrorPage type="500" />
    </>
  );
}