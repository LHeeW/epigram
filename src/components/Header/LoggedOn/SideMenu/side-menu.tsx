"use client";

import Link from "next/link";
import { useState } from "react";
import CloseIcon from "@/../public/icons/close_icon.svg";
import MenuIcon from "@/../public/icons/hamburger_menu_icon.svg";
import styles from "./side-menu.module.css";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <MenuIcon className={styles.menu_icon} onClick={toggleMenu} />
      {isOpen && (
        <button className={styles.overlay} onClick={toggleMenu} type="button" />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebar_header}>
          <button
            className={styles.close_btn}
            type="button"
            onClick={toggleMenu}
          >
            <CloseIcon className={styles.close_icon} />
          </button>
        </div>
        <nav className={styles.nav_list}>
          <Link href={"/feed"} onClick={toggleMenu}>
            피드
          </Link>
          <Link href={"/search"} onClick={toggleMenu}>
            검색
          </Link>
        </nav>
      </aside>
    </>
  );
}
