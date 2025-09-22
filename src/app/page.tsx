/* 
  작성자 : 김재혁
  작성일 : 2025-08-21
  최종 수정일 : 2025-09-22
*/

"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginContent from "@/components/login/LoginContent";
import { useState } from "react";
import Modal from "@/components/common/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div id="wrap">
      <Header />
      <main id="container">
        <p>Login Button</p>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </main>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <LoginContent />
      </Modal>
    </div>
  );
}
