import { useRouter } from "next/router";
import goods from "@/mock/gooda.json";
import GoodItem from "@/components/good-item";
import styles from "@/pages/search.module.css";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";

export default function Page() {
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
