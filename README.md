![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# ISR

- Incremental Static Regeneration

> 공식문서
> 전체 사이트를 재빌드할 필요 없이 페이지별로 정적 생성을 사용할 수 있습니다.
> ISR을 사용하면 정적 페이지의 장점을 유지하면서 수백만 개의 페이지로 확장할 수 있습니다.

- src\pages\index.tsx

```tsx
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
```

### API 호출로 재생성하기

- src\pages\api\revalidate.ts
- /api/revalidate

```tsx
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (error) {
    console.log(error);
    return res.status(200).send("Error Revalidate");
  }
}
```

- src\pages\api\fetch-revalidate.ts

```tsx
export const FerchRevalidate = async () => {
  const url = `http://localhost:3000/api/revalidate`;
  try {
    await fetch(url);
  } catch (error) {
    console.log(error);
  }
};
```

```tsx
onClick = { FerchRevalidate };
```

### 서버 연동 처리

- src\pages\api\getallgood.tsx

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  res.status(200).json(json);
}
```

- src\pages\api\onegood.ts

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType | null>
) {
  // 요청(req)에 의한 Params 처리하기
  // URI 는 무조건 문자열로 처리됩니다.
  const { id } = req.query;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const json = await data.json();
  res.status(200).json(json || null);
}
```

- src\pages\api\randomgood.ts

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 전체 데이터에서 랜덤하게 3개만 추출하기
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  const randomGoods = json.sort(() => Math.random() - 0.5).slice(0, 3);
  res.status(200).json(randomGoods);
}
```

- src\pages\api\searchgood.ts

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoodDataType } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 요청(req)에 의한 쿼리(query) 처리하기
  const { keyword } = req.query;

  const data = await fetch(`https://fakestoreapi.com/products`);
  const json = await data.json();

  const filterGoods = json.filter((good: GoodDataType) =>
    good.title.includes(keyword as string)
  );
  res.status(200).json(filterGoods);
}
```

**Fake Api 는 build 생성이 안되니까 참고하자**
