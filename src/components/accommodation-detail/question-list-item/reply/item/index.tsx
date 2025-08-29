"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { ReplyWrite } from "../reply-write";
import { useReplyListItem } from "./hook";
import { IReplyListItem } from "./types";
import Link from "next/link";

export const ReplyListItem = ({ data, reply, question, isSame }: IReplyListItem) => {
    const { isEdit, setIsEdit, onClickReplyEdit } = useReplyListItem();

    return (
        <>
            <div className={styles.reply_wrapper}>
                {isEdit ? (
                    <ReplyWrite
                        key={reply._id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        question={question}
                        reply={reply}
                    />
                ) : (
                    <div className={styles.answer_wrapper}>
                        <div>
                            <Image
                                src="/images/return.png"
                                alt="답글이미지"
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.answer_wrapper_width_100per}>
                            <div className={styles.user_header_wrapper}>
                                <div className={styles.user_wrapper}>
                                    <div className={styles.detail_user_info}>
                                        <Image
                                            src="/images/profile1.png"
                                            alt="프로필"
                                            width={25}
                                            height={0}
                                        />
                                        {reply?.user?.name}
                                    </div>
                                </div>
                                {isSame && (
                                    <div className={styles.reply_detail_image_wrapper}>
                                        <Image
                                            src={"/images/edit.png"}
                                            className={styles.detail_edit_image}
                                            onClick={onClickReplyEdit}
                                            alt="수정버튼"
                                            width={25}
                                            height={0}
                                        />
                                        <Link
                                            href={`/accommodation/detail/${data?.fetchTravelproduct._id}/${question._id}/${reply._id}/delete`}
                                        >
                                            <Image
                                                src={"/images/close.png"}
                                                className={styles.detail_delete_image}
                                                alt="삭제버튼"
                                                width={25}
                                                height={0}
                                            />
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div>{reply.contents}</div>
                            <div className={styles.detail_reply_contents}>
                                {new Date(reply.createdAt)
                                    .toISOString()
                                    .slice(0, 10)
                                    .replaceAll("-", ".")}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
