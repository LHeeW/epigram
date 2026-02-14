import type { components } from "@/types/types";
import styles from "./epigram.module.css";

interface EpigramsProps {
  data: components["schemas"]["EpigramListType"];
}

export default function Epigram({ data }: EpigramsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.epigram_container}>
        <h3 className={styles.content}>{data.content}</h3>
        <span className={styles.author}>- {data.author} -</span>
      </div>
      <div className={styles.tag_container}>
        {data.tags.map((tag) => (
          <span className={styles.tag} key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
