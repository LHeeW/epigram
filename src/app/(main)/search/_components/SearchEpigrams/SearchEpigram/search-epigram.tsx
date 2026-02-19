import Link from "next/link";
import type { components } from "@/types/types";
import styles from "./search-epigram.module.css";

interface SearchEpigramProps {
  epigram: components["schemas"]["EpigramListType"];
}

export default function SearchEpigram({ epigram }: SearchEpigramProps) {
  return (
    <Link href={`/epigrams/${epigram.id}`} className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.content}>{epigram.content}</div>
        <h5 className={styles.author}>- {epigram.author} -</h5>
        <div className={styles.tags_container}>
          {epigram.tags.map((tag) => (
            <span className={styles.tag} key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
