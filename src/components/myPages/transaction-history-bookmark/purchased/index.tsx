"use client";

import { useQuery } from "@apollo/client";
import { TransactionHistoryBookmarkPagination } from "../pagination";
import styles from "./styles.module.css";
import { FETCH_TRAVEL_PRODUCTS_COUNT_I_BOUGHT } from "@/commons/hooks/queries";

export const Purchased = ({ iBought }) => {
    const { data: iBoughtCount } = useQuery(FETCH_TRAVEL_PRODUCTS_COUNT_I_BOUGHT);
    const lastPage = Math.ceil((iBoughtCount?.fetchTravelproductsCountIBought ?? 10) / 10);

    return (
        <>
            <div className={styles.purchased_wrapper}>
                <div className={styles.purchased_table}>
                    <div className={styles.purchased_header}>
                        <div className={styles.purchased_header_num}>번호</div>
                        <div className={styles.purchased_header_name}>상품 명</div>
                        <div className={styles.purchased_header_bought_price}>구매가격</div>
                        <div className={styles.purchased_header_date}>날짜</div>
                        <div className={styles.purchase_header_seller}>판매자</div>
                    </div>
                    <div className={styles.purchased_body}>
                        {iBought?.fetchTravelproductsIBought?.map((el, idx) => (
                            <div key={idx + 1} className={styles.purchased_row}>
                                <div className={styles.purchased_num}>
                                    {iBought.fetchTravelproductsIBought.length - idx}
                                </div>
                                <div className={styles.purchased_name}>{el.name}</div>
                                <div className={styles.purchased_bought_price}>
                                    {el.price.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.purchased_date}>
                                    {new Date(el.soldAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.purchase_seller}>{el.seller.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <TransactionHistoryBookmarkPagination lastPage={lastPage} />
            </div>
        </>
    );
};
