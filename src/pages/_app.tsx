import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <header>
        <Link href={"/"}>홈</Link>
        <Link href={"/search?keyword=Boo"}>검색</Link>
        <Link href={"/good/1"}>제품 상세</Link>
        <button onClick={handleClick}>홈으로 이동하기</button>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </>
  );
}
