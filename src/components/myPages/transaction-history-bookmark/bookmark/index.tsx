"use client";

import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED } from "@/commons/hooks/queries";
import { TransactionHistoryBookmarkPagination } from "../pagination";
import { TransactionHistoryBookmarkSearchPage } from "../search";
import { useBookmark } from "./took";

export const Bookmark = ({ iPick, refetch }) => {
    const { onChangeKeyword } = useBookmark({ refetch });

    const { data: iPickCount } = useQuery(FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED);

    const lastPage = Math.ceil((iPickCount?.fetchPointTransactionsCountOfLoading ?? 10) / 10);
    return (
        <>
            <TransactionHistoryBookmarkSearchPage onChangeKeyword={onChangeKeyword} />
            <div className={styles.bookmark_wrapper}>
                <div className={styles.bookmark_table}>
                    <div className={styles.bookmark_header}>
                        <div className={styles.bookmark_header_num}>번호</div>
                        <div className={styles.bookmark_header_title}>상품 명</div>
                        <div className={styles.bookmark_header_price}>판매가격</div>
                        <div className={styles.bookmark_header_seller}>판매자</div>
                        <div className={styles.bookmark_header_regDate}>날짜</div>
                    </div>
                    <div className={styles.bookmark_body}>
                        {iPick?.fetchTravelproductsIPicked?.map((el, idx) => (
                            <div key={idx + 1} className={styles.bookmark_row}>
                                <div className={styles.bookmark_num}>
                                    {iPick.fetchTravelproductsIPicked.length - idx}
                                </div>
                                <div className={styles.bookmark_title}>{el.name}</div>
                                <div className={styles.bookmark_price}>
                                    {el.price.toLocaleString("ko-KR")}
                                </div>
                                <div className={styles.bookmark_seller_wrapper}>
                                    판매자 이름
                                    {/* {el.writer} */}
                                </div>
                                <div className={styles.bookmark_regDate}>
                                    {new Date(el.updateAt || el.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
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
