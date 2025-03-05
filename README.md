![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# SSG

Static Site Generation(정적 사이트 생성)
빌드 시점: 개발자가 애플리케이션 또는 Next 프로젝트를 빌드할 때 사전 렌더링 페이지가 생성됩니다.
변경 불가: 배포된 후에는 사전 렌더링 페이지가 변경되지 않으므로, 변경하려면 빌드와 재 배포가 필요합니다.
용도: 자주 바뀌지 않는 페이지에 적합합니다.
사용 범위: 'pages' 폴더 내의 컴포넌트 파일에서만 사용 가능합니다.
성능: Static에 캐시되어 빠른 응답을 제공합니다.

### 기본 예제

- src\pages\index.tsx
  `getStaticProps` 함수로 설정
  InferGetStaticPropsType<typeof getStaticProps> 타입 자동 추론

```tsx
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { fetchGoods } from "@/lib/fetch-goods";

import { fetchRandomGood } from "@/lib/fetch-random-good";
import styles from "@/pages/index.module.css";
import { InferGetStaticPropsType } from "next";
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
  };
};

export default function Home({
  allGoods,
  randomGoods,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        {/* 3개만 랜덤하게 출력 */}
        {randomGoods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 상품</h3>
        {/* 전체 상품 출력 */}
        {allGoods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}

// JS 에서는 함수도 객체다.
// 객체는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
```

- src\pages\search.tsx

```tsx
import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
// import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { ReactNode, useEffect, useState } from "react";
import { GoodDataType } from "@/types";
import { fetchSearchGood } from "@/lib/fetch-search-good";

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
    <div className={styles.container}>
      <h4>
        <strong>{keyword}</strong> : 검색 결과
      </h4>
      <div>
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
```

- src\pages\good\[id].tsx

1. SSG: 빌드 타임에 HTML 파일을 미리 생성하여 서버 요청 시 빠른 응답 제공
2. 동적 경로: getStaticPaths 함수로 모든 가능한 경로를 미리 생성
3. 상품 상세 페이지: http://localhost:3000/good/[id]와 같은 동적 경로 처리 가능
4. 적용 방법: getStaticPaths 함수로 모든 경로를 미리 생성하여 SSG 적용
5. 효과: 자주 바뀌지 않는 페이지에서 성능 향상

```tsx
import { fetchOneGood } from "@/lib/fetch-one-good";
import styles from "@/pages/good/[id].module.css";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";

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
    falback: false, // 위의 paths 에 없는 경로는 404 로 출력
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
  if (data === null) {
    return <div>현재 데이터가 없습니다.</div>;
  }
  const { title, image, category, price, description, rating } = data;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title} <span>(${price})</span>
      </div>
      <div
        className={styles.cover_image}
        style={{ backgroundImage: `url(${image})` }}
      >
        <Image src={image} alt={title} width={245} height={350} />
      </div>
      <div className={styles.category}>{category}</div>
      <div className={styles.rating}>
        Rating : {rating.rate} | {rating.count}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
```
