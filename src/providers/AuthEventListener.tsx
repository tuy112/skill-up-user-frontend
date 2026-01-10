// src/providers/AuthEventListener.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 인증 관련 이벤트를 리스닝하는 컴포넌트
 * - auth:unauthorized 이벤트 발생 시 메인 페이지로 리다이렉트
 */
export default function AuthEventListener() {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = () => {
      // 메인 페이지로 리다이렉트 (Next.js App Router 사용)
      router.push("/");
    };

    // auth:unauthorized 이벤트 리스닝
    window.addEventListener("auth:unauthorized", handleUnauthorized);

    // cleanup
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [router]);

  // UI를 렌더링하지 않음
  return null;
}
