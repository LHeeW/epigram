"use client";

import { useEffect, useState } from "react";
import RecentSearch from "./RecentSearch/recent-search";
import styles from "./recent-searches.module.css";

export default function RecentSearches() {
  const [recentList, setRecentList] = useState<string[]>([]);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);

    const loadRecentSearches = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("recentSearches");
        setRecentList(saved ? JSON.parse(saved) : []);
      }
    };

    loadRecentSearches();

    window.addEventListener("recentSearchUpdate", loadRecentSearches);

    return () => {
      window.removeEventListener("recentSearchUpdate", loadRecentSearches);
    };
  }, []);

  if (!isMount) return null;

  if (recentList.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h3 className={styles.title}>최근 검색어</h3>
        <button
          className={styles.delete_btn}
          type="button"
          onClick={() => {
            localStorage.removeItem("recentSearches");
            setRecentList([]);
          }}
        >
          모두 지우기
        </button>
      </div>
      <div className={styles.recent_searches_container}>
        {recentList.map((item) => (
          <RecentSearch key={item} search={item} />
        ))}
      </div>
    </div>
  );
}
