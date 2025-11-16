import Header from "@/components/common/Header";
import ErrorPage from "@/components/common/Error/ErrorPage";

export default function NotFound() {
  return (
    <>
      <Header variant="sub" />
      <ErrorPage type="404" />
    </>
  );
}