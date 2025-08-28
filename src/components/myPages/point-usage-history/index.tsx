"use client";

import { useQuery } from "@apollo/client";
import { AllHistory } from "./all-history";
import { ChargingHistory } from "./charging-history";
import { usePointUsageHistory } from "./hook";
import { PurchaseHistory } from "./purchase-history";
import { SaleHistory } from "./sale-history";
import styles from "./styles.module.css";
import {
    FETCH_POINT_TRANSACTIONS,
    FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING,
    FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING,
    FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING,
    FETCH_POINT_TRANSACTIONS_OF_BUYING,
    FETCH_POINT_TRANSACTIONS_OF_LOADING,
    FETCH_POINT_TRANSACTIONS_OF_SELLING,
} from "@/commons/apis/queries/queries";

export const PointUsageHistory = () => {
    const { selected, onClickButton } = usePointUsageHistory();

    const { data: pointTransaction, refetch: pointTransactionRefetch } =
        useQuery(FETCH_POINT_TRANSACTIONS);
    const { data: buying, refetch: buyingRefetch } = useQuery(FETCH_POINT_TRANSACTIONS_OF_BUYING);
    const { data: loading, refetch: loadingRefetch } = useQuery(
        FETCH_POINT_TRANSACTIONS_OF_LOADING
    );
    const { data: selling, refetch: sellingRefetch } = useQuery(
        FETCH_POINT_TRANSACTIONS_OF_SELLING
    );

    const { data: buyingCount } = useQuery(FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING);
    const { data: loadingCount } = useQuery(FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING);
    const { data: sellingCount } = useQuery(FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING);

    const allCounts =
        (buyingCount?.fetchPointTransactionsCountOfBuying ?? 0) +
        (loadingCount?.fetchPointTransactionsCountOfLoading ?? 0) +
        (sellingCount?.fetchPointTransactionsCountOfSelling ?? 0);

    return (
        <>
            <div className={styles.button_wrapper}>
                <button
                    onClick={() => onClickButton("allHistory")}
                    className={selected === "allHistory" ? styles.button_selected : ""}
                >
                    전체
                </button>
                <button
                    onClick={() => onClickButton("chargingHistory")}
                    className={selected === "chargingHistory" ? styles.button_selected : ""}
                >
                    충전내역
                </button>
                <button
                    onClick={() => onClickButton("purchaseHistory")}
                    className={selected === "purchaseHistory" ? styles.button_selected : ""}
                >
                    구매내역
                </button>
                <button
                    onClick={() => onClickButton("saleHistory")}
                    className={selected === "saleHistory" ? styles.button_selected : ""}
                >
                    판매내역
                </button>
            </div>
            {selected === "allHistory" && (
                <AllHistory
                    pointTransaction={pointTransaction}
                    allCounts={allCounts}
                    refetch={pointTransactionRefetch}
                />
            )}
            {selected === "chargingHistory" && (
                <ChargingHistory
                    loading={loading}
                    loadingCount={loadingCount}
                    refetch={loadingRefetch}
                />
            )}
            {selected === "purchaseHistory" && (
                <PurchaseHistory
                    buying={buying}
                    buyingCount={buyingCount}
                    refetch={buyingRefetch}
                />
            )}
            {selected === "saleHistory" && (
                <SaleHistory
                    selling={selling}
                    sellingCount={sellingCount}
                    refetch={sellingRefetch}
                />
            )}
        </>
    );
};
