"use client";

import { useQuery } from "@apollo/client";
import { AllHistory } from "./all-history";
import { ChargingHistory } from "./charging-history";
import { usePointUsageHistory } from "./hook";
import { PurchaseHistory } from "./purchase-history";
import { SaleHistory } from "./sale-history";
import styles from "./styles.module.css";
import {
    FETCH_POINT_TRANSACTIONS_OF_BUYING,
    FETCH_POINT_TRANSACTIONS_OF_LOADING,
    FETCH_POINT_TRANSACTIONS_OF_SELLING,
} from "@/commons/hooks/queries";

export const PointUsageHistory = () => {
    const { selected, onClickButton } = usePointUsageHistory();

    const { data: buying } = useQuery(FETCH_POINT_TRANSACTIONS_OF_BUYING);
    const { data: loading } = useQuery(FETCH_POINT_TRANSACTIONS_OF_LOADING);
    const { data: selling } = useQuery(FETCH_POINT_TRANSACTIONS_OF_SELLING);

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
                <AllHistory buying={buying} loading={loading} selling={selling} />
            )}
            {selected === "chargingHistory" && <ChargingHistory loading={loading} />}
            {selected === "purchaseHistory" && <PurchaseHistory buying={buying} />}
            {selected === "saleHistory" && <SaleHistory selling={selling} />}
        </>
    );
};
