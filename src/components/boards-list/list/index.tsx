"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { BoardsList } from "./hook";
import { IBoardListProps } from "./types";
import { Pagination } from "../pagination";
import { BoardSearchPage } from "../search";

export const BoardsListPage = ({
    data,
    lastPage,
    refetch,
    boardsCountRefetch,
}: IBoardListProps) => {
    const {
        keyword,
        onClickBoard,
        onClickDeleteBoard,
        onClickRegister,
        onChangeKeyword,
        onChangeDatePicker,
    } = BoardsList({ refetch, boardsCountRefetch });
    return (
        <>
            <div className={styles.Page}>
                <h1>요즘 핫한 트립토크</h1>
                <div className={styles.tripTalk_wrapper}>
                    {Array(4)
                        .fill(0)
                        .map((a, idx) => (
                            <div key={idx + 1} className={styles.tripTalk_details}>
                                <Image
                                    className={styles.detail_images}
                                    src="/images/detail1.png"
                                    width={120}
                                    height={0}
                                    alt="1번이미지"
                                />
                                <div className={styles.detail_wrapper}>
                                    <div className={styles.detail_wrapper_inner}>
                                        <div className={styles.detail_title}>
                                            제주 살이 1일차 정산별곡이 생각나네요
                                        </div>
                                        <div className={styles.detail_profiles}>
                                            <Image
                                                src="/images/profile1.png"
                                                alt="프로필"
                                                width={25}
                                                height={0}
                                            />
                                            홍길동
                                        </div>
                                    </div>
                                    <div className={styles.detail_likes}>
                                        <div className={styles.like_wrapper}>
                                            <Image
                                                src="/images/good.png"
                                                width={25}
                                                height={0}
                                                alt="좋아요"
                                            />
                                            11
                                        </div>
                                        <div className={styles.grayColor}>2024.11.11</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <h1>트립토크 게시판</h1>
                <div className={styles.tripTalk_boards}>
                    <div className={styles.boards_func_wrapper}>
                        <BoardSearchPage
                            onChangeKeyword={onChangeKeyword}
                            onChangeDatePicker={onChangeDatePicker}
                        />
                        <div>
                            <button onClick={onClickRegister} className={styles.submit_btn}>
                                트립토크 등록
                            </button>
                        </div>
                    </div>
                    <div className={styles.boards_wrapper}>
                        <div className={styles.board_table}>
                            <div className={styles.board_header}>
                                <div className={styles.board_header_num}>번호</div>
                                <div className={styles.board_header_title}>제목</div>
                                <div className={styles.board_header_writer}>작성자</div>
                                <div className={styles.board_header_regDate}>날짜</div>
                                <div className={styles.board_header_delete}></div>
                            </div>
                            <div className={styles.board_body}>
                                {data?.fetchBoards?.map((d, idx) => (
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
                                ))}
                            </div>
                        </div>
                        <Pagination refetch={refetch} lastPage={lastPage} />
                    </div>
                </div>
            </div>
        </>
    );
};
