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
                        <div className={styles.bookmark_header_writer}>판매가격</div>
                        <div className={styles.bookmark_header_seller}>판매자</div>
                        <div className={styles.bookmark_header_regDate}>날짜</div>
                    </div>
                    <div className={styles.bookmark_body}>
                        <div className={styles.bookmark_row}>
                            <div className={styles.bookmark_num}>1</div>
                            <div className={styles.bookmark_title}>1</div>
                            <div className={styles.bookmark_writer}>1</div>
                            <div className={styles.seller_wrapper}>1</div>
                            <div className={styles.bookmark_regDate}>1</div>
                        </div>
                        {/* {data?.fetchbookmarks?.map((d, idx) => (
                            <div key={idx + 1} className={styles.bookmark_row}>
                                <div className={styles.bookmark_num}>{idx + 1}</div>
                                <div
                                    onClick={() => onClickbookmark(d._id)}
                                    className={styles.bookmark_title}
                                >
                                    {d.title
                                        .replaceAll(
                                            keyword,
                                            `[keywordTitle]${keyword}[keywordTitle]`
                                        )
                                        .split("[keywordTitle]")
                                        .map((el, idx) => (
                                            <span
                                                key={`${el}_${idx}`}
                                                className={
                                                    el === keyword
                                                        ? styles.search_keyword
                                                        : ""
                                                }
                                            >
                                                {el}
                                            </span>
                                        ))}
                                </div>
                                <div className={styles.bookmark_writer}>{d.writer}</div>
                                <div className={styles.bookmark_redDate}>
                                    {new Date(d.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.delete_wrapper}>
                                    <Image
                                        id={String(idx + 1)}
                                        className={styles.bookmark_delete}
                                        onClick={() => onClickDeletebookmark(d._id)}
                                        src="/images/delete.png"
                                        width={22}
                                        height={0}
                                        alt="삭제하기"
                                    />
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
                <TransactionHistoryBookmarkPagination lastPage={lastPage} />
            </div>
        </>
    );
};
