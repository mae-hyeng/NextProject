"use client";

import { Bookmark } from "./bookmark";
import { TransactionHistory } from "./transaction-history";
import { useTransactionHistoryBookmark } from "./hook";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import {
    FETCH_TRAVEL_PRODUCTS_I_BOUGHT,
    FETCH_TRAVEL_PRODUCTS_I_PICKED,
    FETCH_TRAVEL_PRODUCTS_I_SOLD,
} from "@/commons/hooks/queries";
import { Purchased } from "./purchased";

export const TransactionHistoryBookmark = () => {
    const { selected, onClickButton } = useTransactionHistoryBookmark();

    const { data: iBought } = useQuery(FETCH_TRAVEL_PRODUCTS_I_BOUGHT);
    const { data: iPick, refetch: iPickRefetch } = useQuery(FETCH_TRAVEL_PRODUCTS_I_PICKED, {
        variables: { search: "" },
    });
    const { data: iSold, refetch: iSoldRefetch } = useQuery(FETCH_TRAVEL_PRODUCTS_I_SOLD);

    console.log("iPick : ", iPick);

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
                    onClick={() => onClickButton("purchased")}
                    className={selected === "purchased" ? styles.button_selected : ""}
                >
                    구매 상품
                </button>
                <button
                    onClick={() => onClickButton("bookmark")}
                    className={selected === "bookmark" ? styles.button_selected : ""}
                >
                    북마크
                </button>
            </div>
            {selected === "myProduct" && (
                <TransactionHistory iSold={iSold} refetch={iSoldRefetch} />
            )}
            {selected === "purchased" && <Purchased iBought={iBought} />}
            {selected === "bookmark" && <Bookmark iPick={iPick} refetch={iPickRefetch} />}
        </>
    );
};
