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
