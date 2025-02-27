![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# Pages Router

- http://localhost:3000
- /src/pages/index.tsx

```tsx
export default function Home() {
  return <h1>Home</h1>;
}
```

### 라우터 설정

**Query String**

- src\pages\search.tsx
- http://localhost:3000/search?keyword={keyword}

```tsx
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <div>
      <b>{keyword}</b>
    </div>
  );
}
```

**Params**

- src\pages\good\[id].tsx
- http://localhost:3000/good/[id]

```tsx
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>
        <b>{id}번</b>제품 정보
      </h1>
    </div>
  );
}
```

**404**

- src\pages\404.tsx _해당 파일명 지키기_
- http://localhost:3000/NotFound

```tsx
export default function Page() {
  return (
    <div>
      <h1>잘못된 주소로 접근하셨습니다.</h1>
    </div>
  );
}
```

### Navigation

##### Link

- 클라이언트 측 라우팅을 사용하여 페이지 이동을 수행하는 기능이다.
- Link 로 연결된 주소는 사전에 자동으로 html 이 만들어진다.

- src/pages/\_app.tsx

```tsx
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
```
