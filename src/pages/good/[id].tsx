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
