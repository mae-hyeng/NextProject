"use client";

import styles from "./styles.module.css";
import { usePointUsageHistoryPagination } from "./took";

export const PointUsageHistoryPagination = () => {
    const { startPage, currentPage, onClickPrevPage, onClickNextPage, onClickPage } =
        usePointUsageHistoryPagination();
    return (
        <div className={styles.pagination_wrapper}>
            <span onClick={onClickPrevPage}>이전페이지</span>

            {new Array(10).fill(0).map(
                (_, idx) =>
                    // idx + startPage <= lastPage && (
                    idx + startPage <= 10 && (
                        <span
                            key={idx + startPage}
                            id={String(idx + startPage)}
                            onClick={onClickPage}
                            // className={classNames(styles.pagination_number, {
                            //     [styles.page_selected]: idx + startPage === currentPage,
                            // })}
                            className={`${styles.pagination_number} ${
                                idx + startPage === currentPage ? styles.page_selected : ""
                            }`}
                        >
                            {idx + startPage}
                        </span>
                    )
            )}

            <span onClick={onClickNextPage}>다음페이지</span>
        </div>
    );
};
