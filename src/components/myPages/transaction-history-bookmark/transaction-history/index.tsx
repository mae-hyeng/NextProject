"use client";

import styles from "./styles.module.css";
import Image from "next/image";

export const TransactionHistory = () => {
    return (
        <>
            <div className={styles.search_wrapper}>
                <input
                    className={styles.text_input}
                    placeholder="제목을 검색해 주세요."
                    type="text"
                />
            </div>
            <div className={styles.transaction_wrapper}>
                <div className={styles.transaction_table}>
                    <div className={styles.transaction_header}>
                        <div className={styles.transaction_header_num}>날짜</div>
                        <div className={styles.transaction_header_title}>내용</div>
                        <div className={styles.transaction_header_writer}>거래 및 충전 내역</div>
                        <div className={styles.transaction_header_regDate}>잔액</div>
                        <div className={styles.transaction_header_delete}></div>
                    </div>
                    <div className={styles.transaction_body}>
                        <div className={styles.transaction_row}>
                            <div className={styles.transaction_num}>1</div>
                            <div className={styles.transaction_title}>1</div>
                            <div className={styles.transaction_writer}>1</div>
                            <div className={styles.transaction_regDate}>1</div>
                            <div className={styles.delete_wrapper}>
                                <Image
                                    // id={String(idx + 1)}
                                    className={styles.board_delete}
                                    // onClick={() => onClickDeleteBoard(d._id)}
                                    src="/images/delete.png"
                                    width={22}
                                    height={0}
                                    alt="삭제하기"
                                />
                            </div>
                        </div>
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
                {/* <Pagination refetch={refetch} lastPage={lastPage} /> */}
            </div>
        </>
    );
};
