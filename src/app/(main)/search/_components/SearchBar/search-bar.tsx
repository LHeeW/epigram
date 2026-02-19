"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@/../public/icons/search_icon.svg";
import styles from "./search-bar.module.css";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (!search.trim() || q === search) return;

    if (typeof window !== "undefined") {
      const prevSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]",
      );

      const updateSearches = [
        search,
        ...prevSearches.filter((item: string) => item !== search),
      ].slice(0, 10);

      localStorage.setItem("recentSearches", JSON.stringify(updateSearches));
      window.dispatchEvent(new Event("recentSearchUpdate"));
    }

    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.search_input}
        type="text"
        name="search"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="검색어 입력"
      />
      <button
        className={styles.search_btn}
        type="button"
        onClick={handleSubmit}
      >
        <SearchIcon className={styles.search_icon} />
      </button>
    </div>
  );
}
