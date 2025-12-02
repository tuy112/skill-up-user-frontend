// src/components/login/LoginContent/index.tsx
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
import Text from "@/components/common/Text";
import Button from "@/components/common/Button";
import { useLogin } from "@/hooks/useLogin";

type SocialType = "google" | "kakao" | "naver";

interface LoginContentProps {
  onSocialLoginClick: (socialType: SocialType) => void;
  onLoginSuccess?: () => void;
}

export default function LoginContent({
  onSocialLoginClick,
  onLoginSuccess,
}: LoginContentProps) {
  const { mutate: testLogin, isPending } = useLogin();
  const isDevelopment = process.env.NODE_ENV === "development";

  const handleTestLogin = () => {
    testLogin(undefined, {
      onSuccess: () => {
        onLoginSuccess?.();
      },
    });
  };
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
              <Text typography="head2_sb_30" color="black">
                스킬업에 오신 것을 환영합니다
              </Text>
              <Text typography="body1_r_16" color="neutral-40">
                다양한 IT 행사 정보를 만나보세요
              </Text>
            </div>
          </div>
          <div className={styles.loginModalRightInner}>
            <div className={styles.loginModalRightInnerSocialLogin}>
              <SocialLoginButton
                src={Google}
                social="Google"
                onClick={() => onSocialLoginClick("google")}
              />
              <SocialLoginButton
                src={Kakao}
                social="Kakao"
                onClick={() => onSocialLoginClick("kakao")}
              />
              <SocialLoginButton
                src={Naver}
                social="Naver"
                onClick={() => onSocialLoginClick("naver")}
              />

              {/* 개발 환경에서만 표시되는 테스트 로그인 버튼 */}
              {isDevelopment && (
                <div className={styles.testLoginButtonWrapper}>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleTestLogin}
                    block
                    disabled={isPending}
                  >
                    {isPending ? "로그인 중..." : "🔧 테스트 로그인 (개발용)"}
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.loginModalRightInnerTerms}>
              <p>
                본인은 만 14세 이상이며, <a>서비스 이용약관</a>과{" "}
                <a>개인정보 처리방침</a>에 동의하고,
              </p>
              <Text typography="label4_m_12" color="neutral-80">
                서비스 제공을 위해 이름과 이메일 수집에 동의합니다.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { SocialType };
