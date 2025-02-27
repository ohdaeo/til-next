![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# Next.js

- Vercel에서 유지 관리하는 풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크
- SSR (Server-side Rendering) 방식

1. 페이지 라우팅 (Page Routing)
   : 별도의 설정 없이 간단하게 페이지 간 이동을 구현할 수 있다.
2. 빌트인 성능 최적화
   : Next.js는 자동으로 성능을 최적화하여 빠른 페이지 로딩을 지원한다.
3. 동적 HTML 스트리밍
   : 서버에서 HTML을 스트리밍하여 더 빠르게 콘텐츠를 전달할 수 있다.

### 환경설정

```bash
npx create-next-app@14 .    -- 14version
npx create-next-app@latest .    -- 최신버전
```

![Image](https://github.com/user-attachments/assets/82284a37-e230-45f3-a0ce-36f540aa5fc3)

**React 와 Next.js 의 차이점**

React 는 CSR(Client Side Rendering) 브라우저에서 렌더링 작업이며, Next.js SSR(Server Side Rendering) : 서버에서 렌더링 작업 이다.

### 사전 렌더링(Pre-rendering)

![한 입 크기로 잘라먹는 Next.js 강의](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcymhaw%2FbtsJpJe9Y85%2FOuS2bpakkWwckWr5q6oK20%2Fimg.png)

- 브라우저의 요청에 대해 사전에 렌더링이 완료된 HTML을 응답하는 렌더링 방식이다.

1. **CSR (Client Side Rendering)**

![한 입 크기로 잘라먹는 Next.js 강의](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcTzYg2%2FbtsJpfyQt12%2FsSphn7Z2vi4WpzY3h9ihT0%2Fimg.png)

- Client Side Rendering의 약자로 클라이언트 측에서 렌더링을 하는 방식이다.
- 최초에 한번 서버에서 전체 페이지를 로딩하여 보여주고, 이후 사용자의 요청이 올 때마다 리소스를 서버에서 제공 해 클라이언트가 해석하고 렌더링을 하는 방식이다.

|                                장점                                |                               단점                               |
| :----------------------------------------------------------------: | :--------------------------------------------------------------: |
|   js만으로 페이지를 만들고 HTML, CSS를 동적으로 생성할 수 있다.    |     SEO에 취약하다: Crawler가 페이지 정보를 확인하기 어렵다.     |
| 컴포넌트 단위로 코드를 나누고 다양한 디자인 패턴을 적용할 수 있다. | 첫 로드시 모든 로직이 담긴 js를 다운로드하므로 로딩 속도가 길다. |
|               Full page load 없이 라우팅이 가능하다.               |                                                                  |

2. **SSR(Server Side Rendering)**

![한 입 크기로 잘라먹는 Next.js 강의](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQiWhJ%2FbtsJn81PoOX%2FUCaX7TU5g9PPLKVT2St1D0%2Fimg.jpg)

- Server Side Rendering의 약자로 서버측에서 렌더링하는 방식이다.
- 기존에 존재하던 방식으로 사용자가 웹페이지에 접근할 때 서버에서 페이지에 대한 요청을 하며, 서버에서는 html,view와 같은 리소스들을 어떻게 보여질지 해석하고 렌더링하여 사용자에게 반환한다.

|                                       장점                                       |                                       단점                                       |
| :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| SEO에 유리: SSR은 미리 페이지를 빌드하여 Crawler에게 많은 정보를 제공할 수 있다. |          사용자 경험: 요청 시마다 새로고침이 발생하여 깜빡임이 생긴다.           |
|            빠른 초기 로딩: SSR은 초기 진입 시 CSR보다 로딩이 빠르다.             |            header나 footer처럼 중복되는 내용도 다시 렌더링해야 한다.             |
|     서버에서 렌더링 후 페이지를 넘겨받아 각각의 페이지 정보를 입력하기 쉽다.     |                    초기 진입은 빠르지만 페이지 이동은 느리다.                    |
|                                                                                  | 완성된 html을 먼저 받아오기 때문에 js 다운로드가 늦어지면 기능이 먹통일 수 있다. |
|                                                                                  |                  TTV(Time to view) !== TTI(Time to interactive)                  |

### API Routes

- NextJS 앱 내에서 API를 만들 수 있게 해주는 기능
  : pages/api 폴더 내의 모든 파일은 /api/\*에 대응되며, page가 아닌 API 엔드포인트로 취급된다

**Pages Router**

- Next.js의 전통적인 라우팅 방식으로, 파일 시스템 기반의 라우팅을 제공합니다.
- pages 폴더 안에 있는 파일들이 자동으로 라우트로 변환됩니다.
  : 예를 들어, pages/about.js 파일은 /about 경로로 접근할 수 있게 됩니다.
- `pages` 디렉토리
- 파일 이름으로 라우트 정의

```
/pages
  /index.ts   <- aaa.com
  /a
    /index.ts <- aaa.com/a
  /b
    /index.ts <- aaa.com/b
  /c.ts       <- aaa.com/c
```

**App Router**

- Next.js 13에서 도입된 새로운 라우팅 시스템입니다.
- React 18의 새로운 기능들을 활용하며, 특히 React Server Components를 기본적으로 지원합니다.
- `app` 디렉토리
- 폴더 이름으로 라우트 정의, page.js 파일이 해당 라우트의 UI를 담당

### 프로젝트 구조

```
til-next
├─ .eslintrc.json
├─ image.png
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ public *정적 파일, 최적화에서 제외
│  └─ favicon.ico
├─ README.md
├─ src *root 폴더
│   pages *router 로 연결시킬 파일 및 폴더
│  │  ├─ api
│  │  │  └─ hello.ts
│  │  ├─ fonts
│  │  │  ├─ GeistMonoVF.woff
│  │  │  └─ GeistVF.woff
│  │  ├─ index.tsx
│  │  ├─ _app.tsx
│  │  └─ _document.tsx
│  ├─ styles *css 파일명.moudle.css 가 일반적
│  │   ├─ globals.css
│  │   └─ Home.module.css
│  │
│  └─ components *컴포넌트 폴더
│
│
└─ tsconfig.json

```

### 시작하기

- src\pages\index.tsx
- http://localhost:3000/

```tsx
export default function Home() {
  return <h1>Home</h1>;
}
```

**\_app.tsx**

- 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트이다
- 공통적인 레이아웃을 가진 모든 페이지에서 사용될 템플릿이며, 모든 페이지에서 공통적인 레이아웃을 만들때 사용된다.
- *글로벌 CSS*는 \_app.tsx 에서만 적용이 가능하다

```tsx
import "@/styles/globals.css"; // Next 의 유일한 css import 문
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <p>Hello</p>
      <Component {...pageProps} />
    </>
  );
}
```

**\_document.tsx**

- \_app.tsx 다음으로 실행되는 파일이다.
- HTML 문서를 커스터마이징 할 수 있는 컴포넌트이다.
- 공통적으로 사용할 head, meta(뷰포트) 정보, body 등을 커스터마이징 할 수 있다.
- 서버에서 실행되는 파일이므로 API 나 이벤트 핸들러는 실행되지 않는다.

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

**next.config.mjs**

```tsx
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```
