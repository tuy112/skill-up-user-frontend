// src/api/instance.ts

import axios from "axios";
import { getDefaultStore } from "jotai";
import { tokenAtom } from "@/store/authAtoms";

const tokenInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//토큰 인증 로직 추가 코드
tokenInstance.interceptors.request.use(
  (config) => {
    const store = getDefaultStore();
    const token = store.get(tokenAtom);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 401 에러 발생 시 토큰을 제거하고 로그아웃 처리하는 코드
tokenInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료되거나 유효하지 않은 경우
      const store = getDefaultStore();
      store.set(tokenAtom, null);

      // 메인 페이지로 리다이렉트
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default tokenInstance;
