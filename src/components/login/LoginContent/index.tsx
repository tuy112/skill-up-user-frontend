// src/components/login/LoginModal/index.tsx

/* 
  작성자 : 김은혜
  작성일 : 2025-09-22
  최종 수정일 : 2025-09-22
*/
"use client";

import styles from "./style.module.css";
import LoginImage from "@/assets/images/loginImg.png";
import SkillUpWhite from "@/assets/svg/skillUp_white.svg";
import SkillUpSymbolBlack from "@/assets/svg/skillUp_symbol_black.svg";
import Image from "next/image";
import SocialLoginButton from "../SocialLoginButton";
import Google from "@/assets/svg/googleIcon.svg";
import Kakao from "@/assets/svg/kakaoIcon.svg";
import Naver from "@/assets/svg/naverIcon.svg";

export default function LoginContent() {
  return (
    <div className={styles.loginModal}>
      <div className={styles.loginModalLeft}>
        <div className={styles.imageWrapper}>
          <div className={styles.overlay}></div>
          <Image
            src={LoginImage}
            alt="Login Image"
            className={styles.loginModalImage}
          />
        </div>

        <div className={styles.loginModalImageText}>
          <Image
            src={SkillUpWhite}
            alt="Skill Up White"
            className={styles.loginModalImageTextImage}
          />
          <p className={styles.loginModalImageTextTitle}>로그인 및 회원가입</p>
        </div>
      </div>
      <div className={styles.loginModalRight}>
        <div className={styles.loginModalRightInner}>
          <div className={styles.loginModalRightInnerTitle}>
            <Image
              src={SkillUpSymbolBlack}
              alt="Skill Up Symbol Black"
              width={48}
              height={35.78}
            />
            <div className={styles.loginModalRightInnerTitleText}>
              <h2>스킬업에 오신 것을 환영합니다</h2>
              <p>다양한 IT 행사 정보를 만나보세요</p>
            </div>
          </div>
          <div className={styles.loginModalRightInner}>
            <div className={styles.loginModalRightInnerSocialLogin}>
              <SocialLoginButton
                src={Google}
                social="Google"
                onClick={() => {}}
              />
              <SocialLoginButton
                src={Kakao}
                social="Kakao"
                onClick={() => {}}
              />
              <SocialLoginButton
                src={Naver}
                social="Naver"
                onClick={() => {}}
              />
            </div>
            <div className={styles.loginModalRightInnerTerms}>
              <p>
                본인은 만 14세 이상이며, <a>서비스 이용약관</a>과{" "}
                <a>개인정보 처리방침</a>에 동의하고,
              </p>
              <p>서비스 제공을 위해 이름과 이메일 수집에 동의합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
