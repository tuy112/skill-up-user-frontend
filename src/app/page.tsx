/*
  작성자 : 김재혁
  작성일 : 2025-08-21
  최종 수정일 : 2025-10-02
*/
"use client";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MainVisual from "@/components/mainSection/MainVisual";
import RecommendEvent from "@/components/mainSection/RecommendEvent";
import RecentEvents from "@/components/mainSection/RecentEvents";
import MiddleBanner from "@/components/mainSection/MiddleBanner";
import Club from "@/components/mainSection/Club";
import RecommendContents from "@/components/mainSection/RecommendContents";
import Bootcamp from "@/components/mainSection/Bootcamp";
import IconMenu from "@/components/mainSection/MainVisual/IconMenu";
import NewsletterCTA from "@/components/mainSection/NewsletterCTA";

export default function Home() {
  return (
    <div id="wrap">
      {/* 시각장애인용 */}
      <p id="skipNav" className="hide">
        <Link href="/">본문 바로가기</Link>
      </p>

      <Header variant="main" />
      <MainVisual />
      <IconMenu />

      {/* main */}
      <main id="container">
        {/* 추천 행사 */}
        <RecommendEvent />

        {/* 추천 컨텐츠 */}
        <RecommendContents />

        {/* 미들배너 */}
        <MiddleBanner />

        {/* 최근 본 행사 */}
        <RecentEvents />

        {/* 부트캠프 */}
        <Bootcamp />

        {/* 동아리, 해커톤, 공모전 */}
        <Club />

        {/* 뉴스레터 CTA */}
        <NewsletterCTA />
      </main>

      <Footer />
    </div>
  );
}
