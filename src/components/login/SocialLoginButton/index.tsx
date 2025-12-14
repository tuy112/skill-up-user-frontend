// src/components/login/socialLoginButton/index.tsx

import styles from "./styles.module.css";
import Image from "next/image";

interface SocialLoginButtonProps {
  src: string;
  social: string;
  onClick: () => void;
}

export default function SocialLoginButton({
  src,
  social,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <button
      className={styles.socialLoginButton}
      onClick={onClick}
      type="button"
    >
      <Image src={src} alt="socialLoginButton" width={42} height={42} />
      <span className={styles.socialLoginButtonText}>{social}로 계속하기</span>
    </button>
  );
}
