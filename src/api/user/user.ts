// src/api/user/user.ts

import instance from "@/api/instance";

// 테스트 로그인 API
export const getTestLogin = async () => {
  const response = await instance.get("/user/test-login");
  // response.data.data가 실제 토큰 값
  return response.data.data;
};

// 유저 데이터 조회 API
export const getUserData = async () => {
  const response = await instance.get("/user/all");
  return response.data;
};
