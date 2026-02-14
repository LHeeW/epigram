"use client";

import { useGetEpigramTodayQuery } from "@/hooks/TanstackQuery/Query/use-epigram-query";
import Epigram from "./Epigram/epigram";

export default function TodayEpigram() {
  const { data: todayEpigram, isLoading } = useGetEpigramTodayQuery();

  if (isLoading) return <div>로딩중...</div>;
  if (!todayEpigram || !todayEpigram.id) {
    return (
      <div>
        아직 생성된 에피그램이 없습니다!!
        <br />
        에피그램을 생성해보세요!
      </div>
    );
  }
  return <Epigram data={todayEpigram} />;
}
