// src/api/auth.ts

import instance from "./instance";

// 소셜 로그인
export const getSocialLogin = async (socialLoginType: string) => {
  const response = await instance.get(`/oauth/${socialLoginType}`);
  return response.data;
};

// 소셜 로그인 콜백
export const getSocialLoginCallback = async (socialLoginType: string) => {
  const response = await instance.get(`/oauth/${socialLoginType}/callback`);
  return response.data;
};
