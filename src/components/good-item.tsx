import { GoodItemType } from "@/types";
import Link from "next/link";
import styles from "@/components/good-item.module.css";
import Image from "next/image";

const GoodItem = ({
  title,
  id,
  image,
  category,
  price,
  rating,
}: GoodItemType): JSX.Element => {
  return (
    <Link href={`/good/${id}`} className={styles.container}>
      <Image src={image} alt={title} width={80} height={132} />
      <div className={styles.txt}>
        <p>{category}</p>
        <h5>{title}</h5>

        <span className={styles.rate}>
          평점: {rating.rate} · {rating.count}
        </span>
        <h4 className={styles.price}>$ {price}</h4>
      </div>
    </Link>
  );
};

export default GoodItem;
