"use client";

import { useRouter } from "next/navigation";
import AddEpigram from "@/components/AddEpigram/add-epigram";
import { usePostEpigramMutation } from "@/hooks/TanstackQuery/Mutation/use-epigram-mutation";
import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const { mutate, isPending } = usePostEpigramMutation();

  const handleSubmit = (formData: FormData) => {
    const payload = {
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      tags: formData.getAll("tags") as string[],
      referenceTitle: (formData.get("referenceTitle") as string) || undefined,
      referenceUrl: (formData.get("referenceUrl") as string) || undefined,
    };

    mutate(payload, {
      onSuccess: (data) => {
        router.push(`/epigrams/${data.id}`);
      },
    });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>에피그램 만들기</h3>
      <AddEpigram onSubmit={handleSubmit} />
      {isPending && <p>저장중...</p>}
    </div>
  );
}
