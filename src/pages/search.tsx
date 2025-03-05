import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
// import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { ReactNode, useEffect, useState } from "react";
import { GoodDataType } from "@/types";
import { fetchSearchGood } from "@/lib/fetch-search-good";
import Head from "next/head";

export default function Page() {
  const [goods, setGoods] = useState<GoodDataType[]>([]);

  const router = useRouter();
  const { keyword } = router.query;

  const fetchSearchResuit = async () => {
    const data = await fetchSearchGood(keyword as string);
  };

  useEffect(() => {
    // 키워드가 바뀌면 실행한다
    fetchSearchResuit();
  }, [keyword]);

  return (
    <>
      <Head>
        <title>해외 쇼핑몰 {keyword}검색 서비스</title>
        <meta
          name="discription"
          content={`해외 상품 {keyword} 검색서비스 입니다.`}
        />
        <meta property="og:title" content={`해외 쇼핑몰 검색 서비스`} />
        <meta
          property="og:discription"
          content={`해외 쇼핑몰 검색 서비스입니다`}
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
