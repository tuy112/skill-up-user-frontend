// src/types/user.ts

export interface UserProfile {
  name: string;
  profileImageUrl: string;
  age: string;
  gender: string;
  role: string;
  interests: string[];
  marketingAgreement: boolean;
}

export interface CustomerCenterInquiry {
  question: string;
  answerTitle: string;
  answerContent: string;
}
