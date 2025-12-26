import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getRecommendedEvents,
  getFeaturedEvents,
  getEndingSoonEvents,
  getCategoryEvents,
  getBanners,
} from "@/api/home";
import { EVENT_CATEGORY } from "@/constants/event";
import MainVisual from "@/components/mainSection/MainVisual";
import RecommendNow from "@/components/mainSection/RecommendNow";
import RecommendInterest from "@/components/mainSection/RecommendInterest";
import RecommendDeadline from "@/components/mainSection/RecommendDeadline";
import RecentEvents from "@/components/mainSection/RecentEvents";
import MiddleBanner from "@/components/mainSection/MiddleBanner";
import Club from "@/components/mainSection/Club";
import RecommendContents from "@/components/mainSection/RecommendContents";
import Bootcamp from "@/components/mainSection/Bootcamp";
import IconMenu from "@/components/mainSection/MainVisual/IconMenu";
import NewsletterCTA from "@/components/mainSection/NewsletterCTA";

export default async function Home() {
  const queryClient = new QueryClient();

  // 서버에서 병렬로 데이터 prefetch (SSR)
  await Promise.all([
    // 해시태그 기반 추천 행사
    queryClient.prefetchQuery({
      queryKey: ["home", "recommended"],
      queryFn: getRecommendedEvents,
    }),

    // 인기/추천 행사 (지금 주목받고 있어요) - IT 개발 탭만 prefetch
    queryClient.prefetchQuery({
      queryKey: ["home", "featured", { tab: "IT 개발", size: undefined }],
      queryFn: () => getFeaturedEvents("IT 개발"),
    }),

    // 곧 종료되는 행사 (신청 마감 행사)
    queryClient.prefetchQuery({
      queryKey: ["home", "ending-soon", { size: 8 }],
      queryFn: () => getEndingSoonEvents(8),
    }),

    // 부트캠프 카테고리
    queryClient.prefetchQuery({
      queryKey: [
      "home",
        "category",
        { category: EVENT_CATEGORY.BOOTCAMP_CLUB, size: 8, page: 1 },
      ],
      queryFn: () => getCategoryEvents(EVENT_CATEGORY.BOOTCAMP_CLUB, 8, 1),
    }),

    // 동아리·해커톤·공모전 카테고리
    queryClient.prefetchQuery({
      queryKey: [
        "home",
        "category",
        { category: EVENT_CATEGORY.COMPETITION_HACKATHON, size: 8, page: 1 },
      ],
      queryFn: () =>
        getCategoryEvents(EVENT_CATEGORY.COMPETITION_HACKATHON, 8, 1),
    }),

    // 배너
    queryClient.prefetchQuery({
      queryKey: ["home", "banners"],
      queryFn: getBanners,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainVisual />
      <IconMenu />

      {/* main */}
      <main id="container">
        {/* 추천 행사 - 지금 주목받고 있어요 */}
        <RecommendNow />
        {/* 추천 행사 - 관심있어하실 행사 */}
        <RecommendInterest />
        {/* 추천 행사 - 신청 마감 행사 */}
        <RecommendDeadline />
        {/* 추천 컨텐츠 */}
        <RecommendContents />
        {/* 미들배너 */}
        <MiddleBanner />
        {/* 최근 본 행사 */}
        <RecentEvents />
        {/* 부트캠프 */}
        <Bootcamp />
        {/* 동아리, 해커톤, 공모전 */}
        <Club />
        {/* 뉴스레터 CTA */}
        <NewsletterCTA />
      </main>
    </HydrationBoundary>
  );
}
