import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
// import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { ReactNode, useEffect, useState } from "react";
import { GoodDataType } from "@/types";
import { fetchSearchGood } from "@/lib/fetch-search-good";

export default function Page() {
  const [goods, setGoods] = useState<GoodDataType[]>([]);

  const router = useRouter();
  const { keyword } = router.query;

  const fetchSearchResuit = async () => {
    const data = await fetchSearchGood(keyword as string);
  };

  useEffect(() => {
    // 키워드가 바뀌면 실행한다
    fetchSearchResuit();
  }, [keyword]);

  return (
    <div className={styles.container}>
      <h4>
        <strong>{keyword}</strong> : 검색 결과
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
