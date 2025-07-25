"use client";

import { AllHistory } from "./all-history";
import { ChargingHistory } from "./charging-history";
import { usePointUsageHistory } from "./hook";
import { PurchaseHistory } from "./purchase-history";
import { SaleHistory } from "./sale-history";
import styles from "./styles.module.css";

export const PointUsageHistory = () => {
    const { selected, onClickButton } = usePointUsageHistory();
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
            {selected === "allHistory" && <AllHistory />}
            {selected === "chargingHistory" && <ChargingHistory />}
            {selected === "purchaseHistory" && <PurchaseHistory />}
            {selected === "saleHistory" && <SaleHistory />}
        </>
    );
};
