"use client";

import { PointUsageHistoryPagination } from "../pagination";
import styles from "./styles.module.css";

export const PurchaseHistory = () => {
    return (
        <>
            <div className={styles.boards_wrapper}>
                <div className={styles.board_table}>
                    <div className={styles.board_header}>
                        <div className={styles.board_header_num}>거래일</div>
                        <div className={styles.board_header_title}>상품 명</div>
                        <div className={styles.board_header_writer}>거래내역</div>
                        <div className={styles.board_header_regDate}>거래 후 잔액</div>
                        <div className={styles.board_header_regDate}>판매자</div>
                    </div>
                    <div className={styles.board_body}>
                        {/* {data?.fetchBoards?.map((d, idx) => (
                            <div key={idx + 1} className={styles.board_row}>
                                <div className={styles.board_num}>{idx + 1}</div>
                                <div
                                    onClick={() => onClickBoard(d._id)}
                                    className={styles.board_title}
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
                                <div className={styles.board_writer}>{d.writer}</div>
                                <div className={styles.board_redDate}>
                                    {new Date(d.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                                <div className={styles.delete_wrapper}>
                                    <Image
                                        id={String(idx + 1)}
                                        className={styles.board_delete}
                                        onClick={() => onClickDeleteBoard(d._id)}
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
                <PointUsageHistoryPagination />
            </div>
        </>
    );
};
