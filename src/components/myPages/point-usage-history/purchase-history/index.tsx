"use client";

import { useQuery } from "@apollo/client";
import { PointUsageHistoryPagination } from "../pagination";
import styles from "./styles.module.css";
import { FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING } from "@/commons/hooks/queries";

export const PurchaseHistory = ({ buying }) => {
    const { data: buyingCount } = useQuery(FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING);
    const lastPage = Math.ceil((buyingCount?.fetchPointTransactionsCountOfBuying ?? 10) / 10);

    return (
        <>
            <div className={styles.purchase_wrapper}>
                <div className={styles.purchase_table}>
                    <div className={styles.purchase_header}>
                        <div className={styles.purchase_header_date}>거래일</div>
                        <div className={styles.purchase_header_title}>상품 명</div>
                        <div className={styles.purchase_header_transaction}>거래내역</div>
                        <div className={styles.purchase_header_balance}>거래 후 잔액</div>
                        <div className={styles.purchase_header_seller}>판매자</div>
                    </div>
                    <div className={styles.purchase_body}>
                        {buying?.fetchPointTransactionsOfBuying?.map((item, idx) => (
                            <div key={idx + 1} className={styles.purchase_row}>
                                <div className={styles.purchase_date}>
                                    {new Date(item.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.purchase_title}>
                                    {item.travelproduct.name}
                                </div>
                                <div className={styles.purchase_transaction}>
                                    {item.amount.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.purchase_balance}>
                                    {item.balance.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.purchase_seller}>판매자</div>
                            </div>
                        ))}
                    </div>
                </div>
                <PointUsageHistoryPagination lastPage={lastPage} />
            </div>
        </>
    );
};
