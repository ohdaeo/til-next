![nextjs](https://svgmix.com/uploads/0b55b6-nextjs-icon.svg)

# CSS

### 인라인 스타일 시트

```tsx
export default function Home() {
  return <h1 style={{ color: "red" }}>Home</h1>;
}
```

### 외부 css 연결

- Next 에서는 외부 css 연동이 불가능 하다
- `_app.tsx` 이외에는 오류가 발생함
- 보통 moudle.css 로 사용이 가능하다.
- src\pages\index.module.css

```tsx
import styles from "./index.module.css";

export default function Home() {
  return <h1 className={styles.title}>Home</h1>;
}
```
