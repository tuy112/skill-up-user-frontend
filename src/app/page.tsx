/* 
  작성자 : 김재혁
  작성일 : 2025-08-21
  최종 수정일 : 2025-10-02
*/
'use client';
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MainVisual from "@/components/mainVisual";
import RecommendEvent from "@/components/recommend-event";
import Interest from "@/components/interest";
import Club from "@/components/club";
import RecommendContents from "@/components/recommend-contents";
import IconMenu from "@/components/mainVisual/IconMenu";
import LoginContent from "@/components/login/LoginContent";
import Modal from "@/components/common/Modal";

import styles from "./main.module.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div id="wrap">
      {/* 시각장애인용 */}
      <p id="skipNav" className="hide">
        <Link href="#main">본문 바로가기</Link>
      </p>

      <Header />
      <MainVisual />
      <IconMenu />

      {/* main */}
      <main id="container" className={styles.main}>
        {/* 추천 행사 */}
        <RecommendEvent/>

        {/* 관심있어할 행사 */}
        <Interest/>

        {/* 동아리, 해커톤, 공모전 */}
        <Club/>

        {/* 추천 컨텐츠 */}
        <RecommendContents/>
      </main>

      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginContent />
      </Modal>
    </div>
  );
}
