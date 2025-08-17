"use client";

import { useQuery } from "@apollo/client";
import { PointUsageHistoryPagination } from "../pagination";
import styles from "./styles.module.css";
import { FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING } from "@/commons/hooks/queries";

export const ChargingHistory = ({ loading }) => {
    const { data: loadingCount } = useQuery(FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING);
    const lastPage = Math.ceil((loadingCount?.fetchPointTransactionsCountOfLoading ?? 10) / 10);

    return (
        <>
            <div className={styles.charging_wrapper}>
                <div className={styles.charging_table}>
                    <div className={styles.charging_header}>
                        <div className={styles.charging_header_date}>충전일</div>
                        <div className={styles.charging_header_impUid}>결제 ID</div>
                        <div className={styles.charging_header_transaction}>충전내역</div>
                        <div className={styles.charging_header_balance}>거래 후 잔액</div>
                    </div>
                    <div className={styles.charging_body}>
                        {loading?.fetchPointTransactionsOfLoading?.map((item, idx) => (
                            <div key={idx + 1} className={styles.charging_row}>
                                <div className={styles.charging_date}>
                                    {new Date(item.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.charging_impUid}>{item.impUid}</div>
                                <div className={styles.charging_transaction}>
                                    +{item.amount.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.charging_balance}>
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
