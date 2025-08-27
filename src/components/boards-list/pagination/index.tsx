"use client";

import classNames from "classnames";
import { usePageNation } from "./hook";
import styles from "./styles.module.css";
import { IPaginationProps } from "./types";

export const Pagination = ({
    refetch,
    lastPage,
    currentPage,
    setCurrentPage,
}: IPaginationProps) => {
    const { startPage, onClickPrevPage, onClickNextPage, onClickPage } = usePageNation({
        refetch,
        lastPage,
        setCurrentPage,
    });
    return (
        <div className={styles.pagination_wrapper}>
            <span onClick={onClickPrevPage}>이전페이지</span>

            {new Array(10).fill(0).map(
                (_, idx) =>
                    idx + startPage <= lastPage && (
                        <span
                            key={idx + startPage}
                            id={String(idx + startPage)}
                            onClick={onClickPage}
                            className={classNames(styles.pagination_number, {
                                [styles.page_selected]: idx + startPage === currentPage,
                            })}
                        >
                            {idx + startPage}
                        </span>
                    )
            )}

            <span onClick={onClickNextPage}>다음페이지</span>
        </div>
    );
};
