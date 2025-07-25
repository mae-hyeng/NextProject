"use client";

import { Bookmark } from "./bookmark";
import { TransactionHistory } from "./transaction-history";
import { useTransactionHistoryBookmark } from "./hook";
import styles from "./styles.module.css";

export const TransactionHistoryBookmark = () => {
    const { selected, onClickButton } = useTransactionHistoryBookmark();
    return (
        <>
            <div className={styles.button_wrapper}>
                <button
                    onClick={() => onClickButton("myProduct")}
                    className={selected === "myProduct" ? styles.button_selected : ""}
                >
                    나의 상품
                </button>
                <button
                    onClick={() => onClickButton("bookmark")}
                    className={selected === "bookmark" ? styles.button_selected : ""}
                >
                    북마크
                </button>
            </div>
            {selected === "myProduct" && <TransactionHistory />}
            {selected === "bookmark" && <Bookmark />}
        </>
    );
};
