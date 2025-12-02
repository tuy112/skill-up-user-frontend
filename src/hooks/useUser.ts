// src/hooks/useUser.ts

import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/api/user";
import { useAuth } from "./useAuth";
import { useSetAtom } from "jotai";
import { userNameAtom } from "@/store/authAtoms";

// 유저 데이터 조회 Hook
export const useUser = () => {
  const { isAuthenticated } = useAuth();
  const setUserName = useSetAtom(userNameAtom);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUserData();
      // API 응답에서 userName 저장
      if (data?.userName) {
        setUserName(data.userName);
      }
      return data;
    },
    // 로그인 상태일 때만 쿼리 실행
    enabled: isAuthenticated,
    retry: false,
  });
};
