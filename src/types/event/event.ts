// src/types/event/event.ts

export interface Event {
  id: string;
  title: string;
  date: string;
  place: string;
  price?: string;
  category: string;
  url?: string;
  image: string;
  badgeLabel?: string;
}

export interface EventDetail {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  price: string;
  place: string;
  online: boolean;
  phoneNumber: string;
  image: string;
}
