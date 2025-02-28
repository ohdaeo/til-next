import styles from "@/pages/index.module.css";
import goods from "@/mock/gooda.json";
import GoodItem from "@/components/good-item";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";

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

// js 에서는 함수도 객체 이고, 객체에는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
