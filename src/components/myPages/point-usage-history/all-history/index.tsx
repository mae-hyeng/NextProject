"use client";

import { PointUsageHistoryPagination } from "../pagination";
import styles from "./styles.module.css";

export const AllHistory = ({ pointTransaction, allCounts, refetch }) => {
    const lastPage = Math.ceil((allCounts || 10) / 10);

    return (
        <>
            <div className={styles.allHistory_wrapper}>
                <div className={styles.allHistory_table}>
                    <div className={styles.allHistory_header}>
                        <div className={styles.allHistory_header_date}>날짜</div>
                        <div className={styles.allHistory_header_contents}>내용</div>
                        <div className={styles.allHistory_header_history}>거래 및 충전 내역</div>
                        <div className={styles.allHistory_header_balance}>잔액</div>
                    </div>
                    <div className={styles.allHistory_body}>
                        {pointTransaction?.fetchPointTransactions.map((data, idx) => (
                            <div key={idx + 1} className={styles.allHistory_row}>
                                <div className={styles.allHistory_date}>
                                    {data?.createdAt
                                        ? new Date(data.createdAt)
                                              .toISOString()
                                              .slice(0, 10)
                                              .replaceAll("-", ".")
                                        : "-"}
                                </div>
                                <div
                                    className={
                                        data?.status === "충전" || data?.status === "판매"
                                            ? `${styles.allHistory_contents} ${styles.blue}`
                                            : `${styles.allHistory_contents} ${styles.red}`
                                    }
                                >
                                    {data?.status}
                                </div>
                                <div
                                    className={
                                        data?.status === "충전" || data?.status === "판매"
                                            ? `${styles.allHistory_history} ${styles.blue}`
                                            : `${styles.allHistory_history} ${styles.red}`
                                    }
                                >
                                    {data?.status === "충전" || data?.status === "판매"
                                        ? `+${data?.amount.toLocaleString("ko-KR")}`
                                        : data?.amount.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.allHistory_balance}>
                                    {data?.balance.toLocaleString("ko-KR")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <PointUsageHistoryPagination lastPage={lastPage} refetch={refetch} />
            </div>
        </>
    );
};
