"use client";

import Link from "next/link";
import { useState } from "react";
import Masonry from "react-masonry-css";
import AppMenuIcon from "@/../public/icons/app_menu_icon.svg";
import PlusIcon from "@/../public/icons/plus_icon.svg";
import LineMenuIcon from "@/../public/icons/sort_icon.svg";
import styles from "./feed-grid.module.css";

interface FeedGridProps {
  children: React.ReactNode;
}

export default function FeedGrid({ children }: FeedGridProps) {
  const [isAppMenu, setIsAppMenu] = useState(true);

  const breakpointColumnObj = {
    default: 2,
    743: isAppMenu ? 2 : 1,
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_icon_container}>
        <h3 className={styles.title}>피드</h3>
        <button
          className={styles.grid_theme_btn}
          type="button"
          onClick={() => setIsAppMenu(!isAppMenu)}
        >
          {isAppMenu ? (
            <LineMenuIcon className={styles.menu_icon} />
          ) : (
            <AppMenuIcon className={styles.menu_icon} />
          )}
        </button>
      </div>
      <Masonry
        breakpointCols={breakpointColumnObj}
        className={styles.my_masonry_grid}
        columnClassName={styles.my_masonry_grid_column}
      >
        {children}
      </Masonry>
      <Link className={styles.add_btn} href={"/addepigram"}>
        <PlusIcon />
      </Link>
    </div>
  );
}
