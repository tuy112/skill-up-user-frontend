import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.css";
import SkillUpSymbolBlack from "@/assets/svg/skillUp_symbol_black.svg";

interface ErrorPageProps {
  type: "404" | "500" | "network";
}

export default function ErrorPage({ type }: ErrorPageProps) {
  const getErrorContent = () => {
    switch (type) {
      case "404":
        return {
          title: "404 Not Found",
          message: (
            <>
              불편을 드려 죄송합니다. 주소가 잘못 입력되었거나
              <br />
              삭제되어 찾을 수 없는 페이지입니다.
            </>
          ),
          buttonText: "홈으로 돌아가기",
          buttonHref: "/",
        };
      case "500":
        return {
          title: "500 Internal Server Error",
          message: (
            <>
              불편을 드려 죄송합니다. 내부 서버에
              <br />
              오류가 발생하여 요청하신 작업을 처리할 수 없습니다.
            </>
          ),
          buttonText: "홈으로 돌아가기",
          buttonHref: "/",
        };
      case "network":
        return {
          title: "네트워크에 연결할 수 없습니다",
          message: (
            <>
              불편을 드려 죄송합니다. 네트워크에 연결할 수 없습니다.
              <br />
              네트워크 연결을 다시 한 번 확인해주세요.
            </>
          ),
          buttonText: "새로고침",
          buttonHref: "",
        };
      default:
        return null;
    }
  };

  const content = getErrorContent();

  const handleButtonClick = () => {
    if (type === "network") {
      window.location.reload();
    }
  };

  return (
    <div className={styles.errorWrap}>
      <div className={styles.logo}>
        <Image
          src={SkillUpSymbolBlack}
          alt="Skill Up Symbol"
          width={48}
          height={48}
        />
      </div>

      <div className={styles.textBox}>
        <h1 className={styles.title}>{content?.title}</h1>
        <p className={styles.desc}>{content?.message}</p>
      </div>

      {type === "network" ? (
        <button onClick={handleButtonClick} className={styles.homeBtn}>
          {content?.buttonText}
        </button>
      ) : (
        <Link href={content?.buttonHref ?? "/"} className={styles.homeBtn}>
          {content?.buttonText}
        </Link>
      )}
    </div>
  );
}
