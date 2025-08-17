"use client";

import { useQuery } from "@apollo/client";
import { TransactionHistoryBookmarkPagination } from "../pagination";
import { useTransactionHistory } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD } from "@/commons/hooks/queries";
import { TransactionHistoryBookmarkSearchPage } from "../search";

export const TransactionHistory = ({ iSold, refetch }) => {
    const { onChangeKeyword } = useTransactionHistory({ refetch });
    const isSold = iSold?.fetchTravelproductsISold.map((el) => (el.soldAt ? true : false));

    const { data: iSoldCount } = useQuery(FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD);
    const lastPage = Math.ceil((iSoldCount?.fetchPointTransactionsCountOfLoading ?? 10) / 10);

    return (
        <>
            <TransactionHistoryBookmarkSearchPage onChangeKeyword={onChangeKeyword} />
            <div className={styles.transaction_wrapper}>
                <div className={styles.transaction_table}>
                    <div className={styles.transaction_header}>
                        <div className={styles.transaction_header_num}>번호</div>
                        <div className={styles.transaction_header_name}>상품 명</div>
                        <div className={styles.transaction_header_selling_price}>판매가격</div>
                        <div className={styles.transaction_header_date}>날짜</div>
                        <div className={styles.transaction_header_delete}></div>
                    </div>
                    <div className={styles.transaction_body}>
                        {iSold?.fetchTravelproductsISold?.map((el, idx) => (
                            <div key={idx + 1} className={styles.transaction_row}>
                                <div className={styles.transaction_num}>
                                    {iSold.fetchTravelproductsISold.length - idx}
                                </div>
                                <div
                                    className={`${styles.transaction_name} ${
                                        isSold[idx] ? styles.isSold_name : ""
                                    }`}
                                >
                                    {el.name}
                                    {isSold[idx] ? (
                                        <p className={styles.isSold_text}>판매완료</p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className={styles.transaction_selling_price}>{el.price}</div>
                                <div className={styles.transaction_date}>
                                    {new Date(el.updatedAt ?? el.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.delete_wrapper}>
                                    <Image
                                        id={String(idx + 1)}
                                        className={styles.transaction_delete}
                                        // onClick={() => onClickDeletetransaction(d._id)}
                                        src="/images/delete.png"
                                        width={22}
                                        height={0}
                                        alt="삭제하기"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <TransactionHistoryBookmarkPagination lastPage={lastPage} />
            </div>
        </>
    );
};
