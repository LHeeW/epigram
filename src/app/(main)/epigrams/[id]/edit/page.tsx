"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import AddEpigram from "@/components/AddEpigram/add-epigram";
import { usePatchEpigramsMutation } from "@/hooks/TanstackQuery/Mutation/use-epigram-mutation";
import { useGetEpigramIdQuery } from "@/hooks/TanstackQuery/Query/use-epigram-query";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import styles from "./page.module.css";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: epigram, isLoading } = useGetEpigramIdQuery(parseInt(id, 10));
  const { data: userData } = useGetUserMeQuery();
  const { mutate: updateEpigram, isPending } = usePatchEpigramsMutation(
    parseInt(id, 10),
  );

  useEffect(() => {
    if (!isLoading && epigram && userData) {
      if (epigram.writerId !== userData.id) {
        router.replace(`/epigrams`);
      }
    }
  }, [isLoading, epigram, userData, router]);

  if (isLoading) return <div>로딩중...</div>;
  if (!epigram) return <div>데이터를 찾을 수 없습니다.</div>;

  const handleSubmit = (formData: FormData) => {
    const payload = {
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      tags: formData.getAll("tags") as string[],
      referenceTitle: (formData.get("referenceTitle") as string) || undefined,
      referenceUrl: (formData.get("referenceUrl") as string) || undefined,
    };

    updateEpigram(payload, {
      onSuccess: () => {
        router.replace(`/epigrams/${id}`);
      },
    });
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>에피그램 수정</h3>
      <AddEpigram
        initialData={{
          content: epigram.content,
          author: epigram.author,
          tags: epigram.tags.map((tag) => tag.name),
          referenceTitle: epigram.referenceTitle ?? undefined,
          referenceUrl: epigram.referenceUrl ?? undefined,
        }}
        onSubmit={handleSubmit}
      />
      {isPending && <p>수정중...</p>}
    </div>
  );
}
