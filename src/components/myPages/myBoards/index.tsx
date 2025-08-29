"use client";

import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { FETCH_BOARDS_COUNT_OF_MINE, FETCH_BOARDS_OF_MINE } from "@/commons/apis/queries/queries";
import { MyBoardsPagination } from "../pagination";
import { MyBoardsSearch } from "../search";
import { useMyBoards } from "./hook";

export const MyBoards = () => {
    const { data, refetch } = useQuery(FETCH_BOARDS_OF_MINE);
    const { data: boardsCount } = useQuery(FETCH_BOARDS_COUNT_OF_MINE);

    const lastPage = Math.ceil((boardsCount?.fetchBoardsCountOfMine ?? 10) / 10);

    const { onChangeKeyword } = useMyBoards({ refetch });

    return (
        <>
            <MyBoardsSearch onChangeKeyword={onChangeKeyword} />
            <div className={styles.myBoards_wrapper}>
                <div className={styles.myBoards_table}>
                    <div className={styles.myBoards_header}>
                        <div className={styles.myBoards_header_num}>번호</div>
                        <div className={styles.myBoards_header_title}>제목</div>
                        <div className={styles.myBoards_header_likeCount}>좋아요</div>
                        <div className={styles.myBoards_header_regDate}>날짜</div>
                    </div>
                    <div className={styles.myBoards_body}>
                        {data?.fetchBoardsOfMine?.map((el, idx) => (
                            <div key={idx + 1} className={styles.myBoards_row}>
                                <div className={styles.myBoards_num}>1</div>
                                <div className={styles.myBoards_title}>{el.name}</div>

                                <div className={styles.myBoards_likeCount}>{el.likeCount}</div>
                                <div className={styles.myBoards_regDate}>
                                    {new Date(el.updatedAt || el.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replaceAll("-", ".")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <MyBoardsPagination lastPage={lastPage} />
            </div>
        </>
    );
};
