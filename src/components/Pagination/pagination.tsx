import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalCount,
  limit,
  onPageChange,
}: PaginationProps) {
  const totalPage = Math.ceil(totalCount / limit);
  if (totalPage <= 1) return null;

  const pageGroupSize = 5;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => onPageChange(startPage - 1)}
        disabled={startPage === 1}
      >
        {"<"}
      </button>
      {pages.map((page) => (
        <button
          className={`${currentPage === page ? styles.page_btn_selected : styles.page_btn}`}
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(endPage + 1)}
        disabled={endPage >= totalPage}
      >
        {">"}
      </button>
    </div>
  );
}
