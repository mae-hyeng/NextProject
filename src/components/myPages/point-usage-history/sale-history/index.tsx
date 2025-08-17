"use client";

import { useQuery } from "@apollo/client";
import { PointUsageHistoryPagination } from "../pagination";
import styles from "./styles.module.css";
import { FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING } from "@/commons/hooks/queries";

export const SaleHistory = ({ selling }) => {
    const { data: sellingCount } = useQuery(FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING);
    const lastPage = Math.ceil((sellingCount?.fetchPointTransactionsCountOfSelling ?? 10) / 10);

    return (
        <>
            <div className={styles.sale_wrapper}>
                <div className={styles.sale_table}>
                    <div className={styles.sale_header}>
                        <div className={styles.sale_header_date}>거래일</div>
                        <div className={styles.sale_header_title}>상품 명</div>
                        <div className={styles.sale_header_transaction}>거래내역</div>
                        <div className={styles.sale_header_balance}>거래 후 잔액</div>
                    </div>
                    <div className={styles.sale_body}>
                        {selling?.fetchPointTransactionsOfSelling?.map((item, idx) => (
                            <div key={idx + 1} className={styles.sale_row}>
                                <div className={styles.sale_date}>
                                    {new Date(item.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.sale_title}>{item.travelproduct.name}</div>
                                <div className={styles.sale_transaction}>
                                    +{item.amount.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.sale_balance}>
                                    {item.balance.toLocaleString("ko-KR")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <PointUsageHistoryPagination lastPage={lastPage} />
            </div>
        </>
    );
};
