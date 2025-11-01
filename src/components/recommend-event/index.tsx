import RecommendNow from "./recommend-now";
import RecommendInterest from "./recommend-interest";
import RecommendDeadline from "./recommend-deadline";

export default function RecommendEvent() {
  return (
    <>
      <RecommendNow />
      <RecommendInterest />
      <RecommendDeadline />
    </>
  );
}