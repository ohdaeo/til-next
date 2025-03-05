![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# 사전 렌더링 (Pre-rendering)

Next.js는 두 가지 사전 렌더링 방식을 지원합니다.

1. Static Generation(정적 생성): 빌드 시 HTML을 생성합니다.
2. Server-side Rendering(서버 측 렌더링): 각 요청마다 HTML을 생성합니다.

# 데이터 패칭 (Data Fetching)

Next.js는 세 가지 데이터 패칭 방식을 지원합니다.

**1. SSR**
서버 측에서 데이터를 가져와 렌더링합니다.

**2. SSG**
빌드 시 데이터를 가져와 정적 페이지를 생성합니다.

**3. ISR**
정적 페이지를 주기적으로 재생성합니다.

### 기본예제 (데이터 패칭 적용)

- index.tsx

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/gooda.json";
import GoodItem from "@/components/good-item";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";
import { InferGetServerSidePropsType } from "next";

/*
Next 에선 약속된 함수가 있다.
SSR 데이터 패칭을 위해서는 해당 함수만을 사용하여야 한다. 
*/

export const getServerSideProps = async () => {
  console.log("getServerSideProps 함수 서버에서 먼저 실행");
  const data = "getServerSideProps 함수 서버에서 먼저 실행 ";

  // 서버에서는 window 등의 웹브라우저용 js 를 사용할수없다.
  window.location;
  // 항상 객체를 리턴하고, 반드시 prop 라는 속성이 있어야 한다.
  return {
    props: {
      // 모든 데이터를 props 객체 안에 넣어야 함
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);

  return (
    <div>
      <section className={styles.container}>
        <h3>지금 추천하는 상품</h3>
        {/* 랜덤 3개 출력 */}
        {goods.slice(0, 3).map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section className={styles.container}>
        <h3>모든 상품</h3>
        {/* 전체 출력 */}
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}

// js 에서는 함수도 객체 이고, 객체에는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
```

### 심화예제 (데이터 패칭을 통해 SSR 적용하기)

- src\pages\api 폴더
- src\pages\api\alldata.ts

```tsx
import { GoodItemType } from "@/types";

// 전체 상품 가져오기 API
export const seedData: GoodItemType = [
  [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    }
    .
    .
    .
  ],
];
```

- src\pages\api\getallgood.tsx

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoodItemType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodItemType[]>
) {
  res.status(200).json(seedData);
}
```

### 심화예제 (전체 상품 호출 fetch 함수)

- fetch 함수들을 별도로 모아서 관리
- `/src/lib 라는 폴더` 생성
- `/src/lib/fetch-good.ts 파일` 생성

```ts
import { GoodItemType } from "@/types";

export const fetchGoods = async (): Promise<GoodItemType[]> => {
  const url = "http://localhost:3000/api/getallgood";
  try {
    // axios 사용해됩니다. 하지만, fetch 를 사용하자.
    // 여기서 fetch 는 Next 에서 추천하고 기능이 더 추가됨.
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

### 심화예제 (API 정의)

- src\pages\api\getallgood.tsx

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodItemType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodItemType[]>
) {
  res.status(200).json(seedData);
}
```

- src\lib\fetch-goods.ts

```ts
import { GoodItemType } from "@/types";

export const fetchGoods = async (): Promise<GoodItemType[]> => {
  const url = "http://localhost:3000/api/getallgood";
  try {
    // axios 사용해됩니다. 하지만, fetch 를 사용하자.
    // 여기서 fetch 는 Next 에서 추천하고 기능이 더 추가됨.
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

- src\pages\api\random.ts

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodItemType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodItemType[]>
) {
  // 전체 데이터에서 랜덤하게 3개만 추출하기
  const randomGoods = seedData.sort(() => Math.random() - 0.5).slice(0, 3);
  res.status(200).json(randomGoods);
}
```

- src\lib\fetch-random-good .ts

```ts
import { GoodItemType } from "@/types";

export const fetchRandomGood = async (): Promise<GoodItemType[]> => {
  const url = "http://localhost:3000/api/randomgood";
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

- src\pages\index.tsx

```tsx
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { fetchGoods } from "@/lib/fetch-goods";
import { fetchRandomGood } from "@/lib/fetch-random-good";
import styles from "@/pages/index.module.css";
import { InferGetServerSidePropsType } from "next";
import { ReactNode } from "react";

// Next 에는 약속이 된 함수가 있다.
export const getServerSideProps = async () => {
  // 항상 객체를 리턴하고, 반드시 prop 라는 속성이 있어야 한다.
  // 데이터를 미리 호출하여서 html 을 완성 리턴한다.

  // const allGoods = await fetchGoods();
  // const randomGoods = await fetchRandomGood();

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

### 심화예제 (getServerSideProps 함수 검색 페이지에 SSR 및 데이터 패치 적용)

1. API 정의하기

- src\pages\search.tsx
- src\pages\api\searchgood.ts

```ts
import { GoodItemType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodItemType[]>
) {
  // 요청(req) 에 의한 쿼리 (query) 처리하기
  const { keyword } = req.query;
  const filterGoods = seedData.filter((good) =>
    good.title.includes(keyword as string)
  );
  res.status(200).json(filterGoods);
}
```

2. Fetch 정의하기

- src\lib\fetch-search-good.ts

```ts
import { GoodItemType } from "@/types";

export const fetcgSearchGood = async (
  keyword: string
): Promise<GoodItemType[]> => {
  const url = `http://localhost:3000/api/searchgood?keyword=${keyword}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
```

- src\pages\search.tsx

```tsx
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { fetcgSearchGood } from "@/lib/fetch-search-good";
import styles from "@/pages/search.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";

// SSR 과 데이터 패치 적용
// 쿼리 스트링을 읽어서 데이터 패치를 하여야한다
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 쿼리스트링이 context 에 담긴다
  const { keyword } = context.query;
  const goods = await fetcgSearchGood(keyword);
  return {
    props: {
      goods,
    },
  };
}

export default function Page({
  goods,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <div className={styles.container}>
      <h4>
        <b>&quot; {keyword} &ldquo;</b> 에 대한 검색 결과 입니다.
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

### 심화예제 (함수 상세페이지)

1. APi 정의

- src\pages\api\onegood.ts

```ts
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodItemType } from "@/types";
export default function handler(req: NextApiRequest, res: NextApiResponse<GoodItemType | null>) {
  // 요청(req)에 의한 Params 처리하기
  // URI 는 무조건 문자열로 처리됩니다.
  const { id } = req.query;
  const filterGoods = seedData.find((good) => good.id === parseInt(id as string));
  res.status(200).json(filterGoods || null);

```

- src\lib\fetch-one-good.ts

```ts
import { GoodItemType } from "@/types";

export const fetchOneGood = async (
  id: number
): Promise<GoodItemType | null> => {
  const url = `http://localhost:3000/api/onegood/${id}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
```
