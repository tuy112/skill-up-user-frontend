// src/utils/format.ts

// DateTime 문자열을 "2025. 01. 01" 형태로 포맷팅
export const formatDate = (dateTime: string): string => {
  if (!dateTime) return "";

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    // 유효하지 않은 날짜인 경우 원본 반환
    return dateTime;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
};

// 숫자를 한국 통화 형식으로 포맷팅 (1,000,000)
export const formatPrice = (price: number): string => {
  if (typeof price !== "number") return "0";

  return price.toLocaleString("ko-KR");
};

// 가격을 "원" 단위로 포맷팅
export const formatPriceWithUnit = (price: number, isFree: boolean): string => {
  if (isFree) return "무료";
  return `${formatPrice(price)}원`;
};

// 모집 마감일까지 남은 일수를 계산하여 표시
export const getDdayLabel = (endDate: string): string => {
  if (!endDate) return "";

  const end = new Date(endDate);
  const today = new Date();

  // 시간 정보를 제거하고 날짜만 비교
  end.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (isNaN(end.getTime())) {
    return "";
  }

  // 밀리초를 일수로 변환
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "마감";
  } else if (diffDays === 0) {
    return "오늘 마감";
  } else {
    return `${diffDays}일 남았어요`;
  }
};
