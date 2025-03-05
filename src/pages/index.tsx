import SearchLayout from "@/components/search-layout";
import { fetchGoods } from "@/lib/fetch-goods";
import { fetchRandomGood } from "@/lib/fetch-random-good";

import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ReactNode } from "react";

// Next 에는 약속이 된 함수가 있다.
export const getStaticProps = async () => {
  // 병렬로 실행하기
  const [allGoods, randomGoods] = await Promise.all([
    fetchGoods(),
    fetchRandomGood(),
  ]);

  return {
    props: {
      allGoods: allGoods,
      randomGoods: randomGoods,
    },
    revalidate: 60, // 60초후 다시생성
  };
};

export default function Home({
  allGoods,
  randomGoods,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>해외 쇼핑몰 추천 서비스</title>
        <meta name="discription" content="해외 상품 추천서비스 입니다." />
        <meta property="og:title" content="해외 쇼핑몰 추천 서비스" />
        <meta
          property="og:discription"
          content="해외 쇼핑몰 추천 서비스입니다"
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
    </>
  );
}

// JS 에서는 함수도 객체다.
// 객체는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
