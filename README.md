![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# API

- 서버리스 함수 디렉토리
- 이 폴더의 파일들은 자동으로 API 엔드포인트로 변환된다.
- 서버를 직접 관리하지 않고 백엔드 로직을 구현할 수 있다.
- 각 파일은 개별적인 API 엔드포인트를 나타내며, 파일 이름이 엔드포인트 경로가 된다.

### 예제

- src\pages\api\getallgood.tsx
- http://localhost:3000/api/getallgood

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  res.status(200).json(json);
}
```
