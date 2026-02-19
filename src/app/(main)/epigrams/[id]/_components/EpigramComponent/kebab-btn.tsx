"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import KebabIcon from "@/../public/icons/kebab_menu_icon.svg";
import { useDeleteEpigramsMutation } from "@/hooks/TanstackQuery/Mutation/use-epigram-mutation";
import type { components } from "@/types/types";
import styles from "./kebab-btn.module.css";

interface KebabBtnProps {
  epigram?: components["schemas"]["EpigramListType"];
  id: string;
}

export default function KebabBtn({ epigram, id }: KebabBtnProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { mutate: deleteEpigram } = useDeleteEpigramsMutation();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleDelete = () => {
    deleteEpigram(parseInt(id, 10), {
      onSuccess: () => {
        router.replace(`/feed`);
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.kebab_btn}
        type="button"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <KebabIcon className={styles.kebab_icon} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          <li>
            <button
              type="button"
              onClick={() => router.push(`/epigrams/${id}/edit`)}
            >
              수정하기
            </button>
          </li>
          <li>
            <button type="button" onClick={handleDelete}>
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
