import { GoodDataType } from "@/types";

export const fetchOneGood = async (
  id: number
): Promise<GoodDataType | null> => {
  // const url = `http://localhost:3000/api/onegood?id=${id}`;
  const url = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(url);
    // console.log(response);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch goods");
    // }
    let data = await response.json();
    data = data.find((good: GoodDataType) => good.id === id);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
