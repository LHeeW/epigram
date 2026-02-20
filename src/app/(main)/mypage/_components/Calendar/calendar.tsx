"use client";

import Calendar from "react-calendar";
import styles from "./calendar.module.css";
import "./calendar.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { useEmotionLogsMonthlyQuery } from "@/hooks/TanstackQuery/Query/use-emotionlog-query";
import { useGetUserMeQuery } from "@/hooks/TanstackQuery/Query/use-user-query";
import { emotionList } from "@/utils/emotion-list";
import Charts from "../\bCharts/charts";

const getEmotionIcon = (emotionType?: string) => {
  const target = emotionList?.find((item) => item.emotion_type === emotionType);
  return target ? <div className="emoji-icon">{target.icon}</div> : null;
};

export default function CustomCalendar() {
  const [isMount, setIsMount] = useState(false);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const { data: userData } = useGetUserMeQuery();
  const { data: emotionLogsList, isLoading } = useEmotionLogsMonthlyQuery({
    userId: userData?.id as number,
    year: activeStartDate.getFullYear(),
    month: activeStartDate.getMonth() + 1,
  });

  useEffect(() => {
    setIsMount(true);
  }, []);

  const handleViewChange = ({
    activeStartDate: newDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (newDate) {
      setActiveStartDate(newDate);
    }
  };

  if (!isMount || isLoading) return <div>로딩중...</div>;

  return (
    <div className={styles.container}>
      <div className="custom-calendar">
        <Calendar
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleViewChange}
          formatDay={(_, date) =>
            date.toLocaleDateString("en", { day: "numeric" })
          }
          calendarType="gregory"
          prevLabel={"◀"}
          nextLabel={"▶"}
          prev2Label={null}
          next2Label={null}
          tileClassName={({ date, view }) => {
            if (view === "month" && emotionLogsList) {
              const tileDateStr = date.toLocaleDateString("en-CA");
              const hasLog = emotionLogsList.some(
                (item) => item.createdAt.split("T")[0] === tileDateStr,
              );
              return hasLog ? "has-emotion" : null;
            }
          }}
          tileContent={({ date }) => {
            const tileDateStr = date.toLocaleDateString("en-CA");
            const log = emotionLogsList?.find(
              (item) => item.createdAt.split("T")[0] === tileDateStr,
            );

            return (
              <div className="tile-content-wrapper">
                {getEmotionIcon(log?.emotion)}
              </div>
            );
          }}
        />
      </div>
      <Charts
        year={activeStartDate.getFullYear()}
        month={activeStartDate.getMonth() + 1}
      />
    </div>
  );
}
