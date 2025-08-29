"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardsList } from "./hook";
import { IBoardListProps } from "./types";
import { Pagination } from "../pagination";
import { BoardSearchPage } from "../search";
import Link from "next/link";

export const BoardsListPage = ({
    data,
    bestBoards,
    lastPage,
    refetch,
    boardsCountRefetch,
    currentPage,
    setCurrentPage,
}: IBoardListProps) => {
    const { user, keyword, onClickBoard, onClickRegister, onChangeKeyword, onChangeDatePicker } =
        useBoardsList({ refetch, boardsCountRefetch, setCurrentPage });
    return (
        <>
            <div className={styles.Page}>
                <h1>요즘 핫한 트립토크</h1>
                <div className={styles.tripTalk_wrapper}>
                    {bestBoards?.fetchBoardsOfTheBest.map((board, idx) => (
                        <div
                            key={idx + 1}
                            className={styles.tripTalk_details}
                            onClick={onClickBoard(board._id)}
                        >
                            <div className={styles.image_wrapper}>
                                <Image
                                    className={styles.detail_images}
                                    src={
                                        board.images.filter(Boolean).length
                                            ? `https://storage.googleapis.com/${board.images[0]}`
                                            : "/images/accommodation-detail.png"
                                    }
                                    width={350}
                                    height={350}
                                    alt="이미지"
                                />
                            </div>
                            <div className={styles.detail_wrapper}>
                                <div className={styles.detail_wrapper_inner}>
                                    <div className={styles.detail_title}>{board.title}</div>
                                    <div className={styles.detail_profiles}>
                                        <Image
                                            src="/images/profile1.png"
                                            alt="프로필"
                                            width={25}
                                            height={0}
                                        />
                                        {board.writer}
                                    </div>
                                </div>
                                <div className={styles.detail_likes}>
                                    <div className={styles.like_wrapper}>
                                        <Image
                                            src="/images/good-red.png"
                                            width={25}
                                            height={0}
                                            alt="좋아요"
                                        />
                                        {board.likeCount}
                                    </div>
                                    <div className={styles.detail_date}>
                                        {new Date(board.updatedAt)
                                            .toISOString()
                                            .slice(0, 10)
                                            .replaceAll("-", ".")}
                                    </div>
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
                                        <div className={styles.board_num}>
                                            {(currentPage - 1) * 10 + idx + 1}
                                        </div>
                                        <div
                                            onClick={onClickBoard(d._id)}
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
                                            <Link href={`/boards/${d._id}/delete`}>
                                                {user?.name === d.writer && (
                                                    <Image
                                                        id={String(idx + 1)}
                                                        className={styles.board_delete}
                                                        src="/images/delete.png"
                                                        width={22}
                                                        height={0}
                                                        alt="삭제하기"
                                                    />
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Pagination
                            refetch={refetch}
                            lastPage={lastPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
