import React, { ChangeEvent, KeyboardEvent, ReactNode, useState } from "react";
import styles from "@/components/search-layout.module.css";
import { useRouter } from "next/router";

const SearchLayout = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (search.trim() === "") {
      alert("검색어를 입력해주세요");
      return;
    }
    router.push(`/search?keyword=${search}`);
    setSearch("");
  };

  const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(search);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyEnter(e)}
        />
        <button onClick={handleSubmit}>검색</button>
      </div>
      <>{children}</>
    </div>
  );
};

export default SearchLayout;
