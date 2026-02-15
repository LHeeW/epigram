import CommentComponent from "./_components/CommentComponent/comment-component";
import EpigramComponent from "./_components/EpigramComponent/epigram-component";
import styles from "./page.module.css";

interface EpigramsIdProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: EpigramsIdProps) {
  const { id } = await params;

  return (
    <div className={styles.container}>
      <EpigramComponent id={id} />
      <CommentComponent id={id} />
    </div>
  );
}
