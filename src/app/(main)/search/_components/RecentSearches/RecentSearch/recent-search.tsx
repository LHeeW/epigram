import { useRouter } from "next/navigation";
import styles from "./recent-search.module.css";

interface RecentSearchProps {
  search: string;
}

export default function RecentSearch({ search }: RecentSearchProps) {
  const router = useRouter();

  return (
    <button
      className={styles.recent_search}
      type="button"
      onClick={() => {
        router.push(`/search?q=${search}`);
      }}
    >
      {search}
    </button>
  );
}
