"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardsDetail } from "./hook";
import { IBoardDetailProps } from "./types";
import ReactPlayer from "react-player";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Banner } from "@/commons/layout/banner";

export const BoardsDetail = ({ data }: IBoardDetailProps) => {
    const { onClickToBoards, onClickToUpdate } = useBoardsDetail();
    return (
        <>
            <Banner />
            <div className={styles.BoardsDetail}>
                <div className={styles.detail_header}>
                    <div className={styles.detail_header_title}>{data?.fetchBoard?.title}</div>
                    <div className={styles.detail_header_info}>
                        <div className={styles.info_user}>
                            <div>
                                <Image
                                    src="/images/profile1.png"
                                    alt="프로필이미지"
                                    width={25}
                                    height={0}
                                    sizes="100vw"
                                />
                            </div>
                            <div>{data?.fetchBoard?.writer}</div>
                        </div>
                        <div className={styles.info_regDate}>
                            {data?.fetchBoard?.createdAt
                                ? new Date(data.fetchBoard.createdAt)
                                      .toISOString()
                                      .slice(0, 10)
                                      .replaceAll("-", ".")
                                : ""}
                        </div>
                    </div>
                </div>
                <div className={styles.divideLine}></div>
                <div className={styles.detail_main}>
                    <div className={styles.detail_main_loc}>
                        <button>{data?.fetchBoard?.boardAddress?.address}</button>
                    </div>
                    <div className={styles.detail_main_wrapper}>
                        <div className={styles.img1}>
                            {data?.fetchBoard.images.map((url, idx) =>
                                url !== "" ? (
                                    <Image
                                        key={idx}
                                        className={styles.detail1_img}
                                        src={`https://storage.googleapis.com/${url}`}
                                        alt="디테일"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                    />
                                ) : null
                            )}
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data?.fetchBoard.contents,
                            }}
                        ></div>
                        <div className={styles.youtube_wrapper}>
                            <ReactPlayer
                                src={data?.fetchBoard.youtubeUrl}
                                className={styles.youtube_player}
                                width={"100%"}
                                height={"100%"}
                                muted
                                controls
                                // light
                            />
                        </div>
                    </div>
                    <div className={styles.detail_main_like}>
                        <div className={styles.detail_main_like_btn}>
                            <ThumbDownIcon />
                            24
                        </div>
                        <div className={styles.detail_main_like_btn}>
                            <ThumbUpIcon />
                            12
                        </div>
                    </div>
                    <div className={styles.detail_main_btn}>
                        <button onClick={onClickToBoards} className={styles.detail_main_btn_list}>
                            목록으로
                        </button>
                        <button onClick={onClickToUpdate} className={styles.detail_main_btn_modify}>
                            수정하기
                        </button>
                    </div>
                </div>
                <div className={styles.divideLine}></div>
                <div className={styles.detail_reg_comment_img_wrapper}>
                    <Image
                        src="/images/chat.png"
                        alt="댓글이미지"
                        width={25}
                        height={0}
                        sizes="100vw"
                    />
                    댓글
                </div>
            </div>
        </>
    );
};
