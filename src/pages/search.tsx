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
