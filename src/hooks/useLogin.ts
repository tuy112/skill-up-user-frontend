// src/hooks/useLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getTestLogin } from "@/api/user";
import { useAuth } from "./useAuth";

// 로그인 Mutation Hook 코드
export const useLogin = () => {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getTestLogin,
    onSuccess: (token: string) => {
      // 유저 데이터 쿼리 무효화 -> useUser 훅이 자동으로 데이터 재조회
      queryClient.invalidateQueries({ queryKey: ["user"] });
      login(token);
    },
  });
};
