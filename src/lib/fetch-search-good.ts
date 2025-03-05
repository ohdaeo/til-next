import { GoodDataType } from "@/types";

export const fetchSearchGood = async (
  keyword: string
): Promise<GoodDataType[]> => {
  const url = `http://localhost:3000/api/searchgood?keyword=${keyword}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
