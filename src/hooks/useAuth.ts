// src/hooks/useAuth.ts

import { useAtom, useAtomValue } from "jotai";
import {
  tokenAtom,
  isAuthenticatedAtom,
  userNameAtom,
} from "@/store/authAtoms";

// 인증 관련 훅
export const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  // 로그인 - 토큰만 저장
  const login = (accessToken: string) => {
    setToken(accessToken);
  };

  // 로그아웃 - 모든 인증 정보 제거
  const logout = () => {
    setToken(null);
    setUserName(null);
  };

  // 토큰 업데이트
  const updateToken = (newToken: string) => {
    setToken(newToken);
  };

  return {
    token,
    userName,
    isAuthenticated,
    login,
    logout,
    updateToken,
    setUserName,
  };
};
