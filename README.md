![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# Global Css

- 모든 디렉터리에 전역적으로 사용되는 css파일은 app/global.css파일에 지정
- `_app.tsx`에서만 import 가능한 pages 디렉터리와는 다르게 app 디렉터리에서는 필요한곳 어디에서는 글로벌 css를 가져올 수 있음

### 기본예제

- src\components\global-layout.tsx

```tsx
import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>상단</header>
      <main>{children}</main>
      <footer>하단</footer>
    </div>
  );
}
```

- \_app.tsx

```tsx
import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
```

### 심화예제 (쇼핑몰 만들기)

**파일 생성**

- src\pages\index.tsx

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/gooda.json";
import GoodItem from "@/components/good-item";

export default function Home() {
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
```

- src\components\global-layout.tsx

```tsx
import { ReactNode } from "react";
import styles from "../styles/global-layout.module.css";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={""}>🛍 쇼핑몰</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>copyright 2025 @ by shop</footer>
    </div>
  );
}
```

- src\styles\global-layout.module.css

- src\components\good-item.tsx

```tsx
import { GoodItemType } from "@/types";
import Link from "next/link";
import styles from "@/components/good-item.module.css";
import Image from "next/image";

const GoodItem = ({
  title,
  id,
  image,
  category,
  price,
  rating,
}: GoodItemType): JSX.Element => {
  return (
    <Link href={`/good/${id}`} className={styles.container}>
      <Image src={image} alt={title} width={80} height={132} />
      <div className={styles.txt}>
        <p>{category}</p>
        <h5>{title}</h5>

        <span className={styles.rate}>
          평점: {rating.rate} · {rating.count}
        </span>
        <h4 className={styles.price}>$ {price}</h4>
      </div>
    </Link>
  );
};

export default GoodItem;
```

- src\components\good-item.module.css

**더미 파일 (Mock Data)**

- src\mock\gooda.json

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  .
  .
  .
]
```

### image 최적화

- Next 는 이미지를 자동으로 용량 최적화 해줌.
- Next 는 스크롤시 화면에 이미지가 보일 때줌 로딩합니다.
- layzy loading
- 곤란한 상황 (외부경로 이미지는 설정이 필요)

**1. Image 컴포넌트**

- width
- height

**2. 외부 URL 이미지 경로 사용시 설정**

- `next.config.mjs` 추가

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

export default nextConfig;
```

### 심화예제 (검색 기능)

- src\components\search-layout.tsx

```tsx
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "@/components/search-layout.module.css";
import { useRouter } from "next/router";

const SearchLayout = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search.trim() === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    router.push(`/seach?keyword=${search}`);
    setSearch("");
  };

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(search);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyEnter(e)}
        />
        <button onClick={handleSubmit}>검색</button>
      </div>
    </div>
  );
};

export default SearchLayout;
```

- src\components\search-layout.module.css

- src\pages_app.tsx

```tsx
import GlobalLayout from "@/components/global-layout";
import SearchLayout from "@/components/search-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <SearchLayout />
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
```

- src\pages\search.tsx

```tsx
import { useRouter } from "next/router";
import goods from "@/mock/gooda.json";
import GoodItem from "@/components/good-item";

export default function Page() {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <div>
      <h4>
        <b>{keyword}</b> 에 대한 검색 결과 입니다.
      </h4>
      <div>
        {goods.map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
```

### 심화예제 (상품 상세페이지)

- src\pages\good\[id].tsx

```tsx
import { GoodItemType } from "@/types";
import { useRouter } from "next/router";
import styles from "@/pages/good/[id].module.css";

const mockData: GoodItemType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

export default function Page() {
  const { category, description, image, price, rating, title } = mockData;
  return (
    <div className={styles.container}>
      <ul className={styles.box}>
        <li className={styles.boxitem}>
          <img
            src={image}
            alt={title}
            // style={{ backgroundImage: `url(${image})` }}
          />
          <div className={styles.txt}>
            <p>
              {category}
              <span>
                ⭐ {rating.rate} · {rating.count}
              </span>
            </p>

            <h3>{title}</h3>
            <small>{description}</small>
            <h1>$ {price}</h1>
          </div>
        </li>
      </ul>
    </div>
  );
}
```
