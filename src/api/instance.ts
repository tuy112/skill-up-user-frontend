// src/api/instance.ts

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 중앙화된 에러 처리 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    // 개발 환경에서 에러 로깅
    if (process.env.NODE_ENV === "development") {
      console.error("[API Error]", {
        url: error.config?.url,
        method: error.config?.method,
        status,
        message,
        data: error.response?.data,
      });
    }

    // TODO: 추후 전역 Toast 시스템과 통합 예정
    // 현재는 각 컴포넌트에서 개별적으로 에러 처리
    // 향후 개선: showToast를 인터셉터에서 직접 호출할 수 있도록 구조 개선

    return Promise.reject(error);
  }
);

export default instance;
