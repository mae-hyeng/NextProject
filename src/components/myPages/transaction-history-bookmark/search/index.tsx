"use client";
import styles from "./styles.module.css";
import _ from "lodash";
import { ITransactionHistoryBookmarkSearchProps } from "./types";

export const TransactionHistoryBookmarkSearch = ({
    onChangeKeyword,
}: ITransactionHistoryBookmarkSearchProps) => {
    return (
        <>
            <div className={styles.search_wrapper}>
                <input
                    onChange={onChangeKeyword}
                    className={styles.text_input}
                    placeholder="제목을 검색해 주세요."
                    type="text"
                />
            </div>
        </>
    );
};
