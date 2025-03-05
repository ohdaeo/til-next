import { fetchOneGood } from "@/lib/fetch-one-good";
import styles from "@/pages/good/[id].module.css";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// 라우터가 동적인 경로가 필요로 한 상황
export function getStaticPaths() {
  return {
    // paths 에는 기본적으로 SSG 를 적용해서 데이터를 미리 생성후 반영할 경로
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
    ],
    fallback: false, // false 인 경우 paths 에 없는 경로는 404 로 출력
    // ture 인 경우 레이아웃 렌더링 후 데이터 로드, blockig 인 경우 즉시 SSG 로 생성
  };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  // 쿼리 스트링이 context 에 담겨있음.
  // const { keyword } = context.query;

  // 파라메터는 context 에 담겨있음.
  // 파라메터도 서버에서 문자열로만 온다.
  const id = context.params!.id;
  const data = await fetchOneGood(parseInt(id as string));
  return {
    props: {
      data: data,
    },
  };
}

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>해외 쇼핑몰 추천 서비스</title>
          <meta name="discription" content="해외 상품 추천서비스입니다." />
          <meta property="og:title" content="해외 쇼핑몰 추천 서비스" />
          <meta
            property="og:discription"
            content="해외 상품 추천서비스입니다."
          />
          <meta property="og:image" content="/thumbnail.png" />
        </Head>
        <div>Loading...</div>
      </>
    );
  }
  if (data === null) {
    return (
      <>
        <div>현재 데이터가 없습니다.</div>;
      </>
    );
  }
  const { title, image, category, price, description, rating } = data;
  return (
    <>
      <Head>
        <title>{title} 상세정보 </title>
        <meta name="discription" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:discription" content={description} />
        <meta property="og:image" content={image} />
      </Head>
    </>
  );
}
