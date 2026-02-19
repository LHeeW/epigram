"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useEmotionLogsMonthlyQuery } from "@/hooks/TanstackQuery/Query/use-emotionlog-query";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import styles from "./charts.module.css";

const EMOTION_LABELS: Record<string, string> = {
  MOVED: "감동",
  HAPPY: "기쁨",
  WORRIED: "고민",
  SAD: "슬픔",
  ANGRY: "분노",
};

const EMOTION_COLORS: Record<string, string> = {
  MOVED: "#FF5DAD",
  HAPPY: "#FFD233",
  WORRIED: "#AD89FF",
  SAD: "#59ADFF",
  ANGRY: "#FF5C5C",
};

export default function Charts() {
  const { data: userData } = useGetUserMeQuery();
  const { data: emotionLogs } = useEmotionLogsMonthlyQuery({
    userId: userData?.id as number,
    year: 2026,
    month: 2,
  });

  const chartData = useMemo(() => {
    if (!emotionLogs) return [];

    const counts = emotionLogs.reduce((acc: Record<string, number>, cur) => {
      const type = cur.emotion;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map((type) => ({
      type,
      count: counts[type],
      label: EMOTION_LABELS[type] || type,
    }));
  }, [emotionLogs]);

  const totalCount = chartData.reduce((acc, cur) => acc + cur.count, 0);

  const topEmotion = useMemo(() => {
    if (chartData.length === 0) return { label: "데이터 없음" };
    return [...chartData].sort((a, b) => b.count - a.count)[0];
  }, [chartData]);

  if (!emotionLogs || emotionLogs.length === 0) {
    return <div className={styles.container}>이번 달 기록이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.chart_wrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={5}
              dataKey="count"
              nameKey="type"
              strokeWidth={3}
              stroke="#fff"
            >
              {chartData.map((entry) => (
                <Cell key={entry.type} fill={EMOTION_COLORS[entry.type]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.center_text}>
          <span className={styles.center_label}>{topEmotion.label}</span>
        </div>
      </div>

      <div className={styles.legend_list}>
        {chartData.map((item) => {
          const percent = Math.round((item.count / totalCount) * 100);
          return (
            <div key={item.type} className={styles.legend_item}>
              <div
                className={styles.dot}
                style={{ backgroundColor: EMOTION_COLORS[item.type] }}
              />
              <span className={styles.label}>{item.label}</span>
              <span className={styles.percent}>{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
