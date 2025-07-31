"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { ReplyWrite } from "../reply-write";
import { useReplyListItem } from "./hook";

export const ReplyListItem = ({ reply, data, question, refetchQuestionData, refetchReplyData }) => {
    const { isEdit, setIsEdit, onClickReplyEdit, onClickReplyDelete } = useReplyListItem({
        data,
        question,
        refetchQuestionData,
        refetchReplyData,
    });

    return (
        <>
            <div className={styles.reply_wrapper}>
                {isEdit ? (
                    <ReplyWrite
                        key={reply._id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        question={question}
                        refetchQuestionData={refetchQuestionData}
                        reply={reply}
                    />
                ) : (
                    <>
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
                            <div className={styles.detail_image_wrapper}>
                                <Image
                                    src={"/images/edit.png"}
                                    className={styles.detail_edit_image}
                                    onClick={onClickReplyEdit}
                                    alt="수정버튼"
                                    width={25}
                                    height={0}
                                />
                                <Image
                                    src={"/images/close.png"}
                                    className={styles.detail_delete_image}
                                    onClick={() => onClickReplyDelete(reply._id)}
                                    alt="삭제버튼"
                                    width={25}
                                    height={0}
                                />
                            </div>
                        </div>
                        <div>{reply.contents}</div>
                        <div className={styles.detail_reply_contents}>
                            {new Date(reply.createdAt)
                                .toISOString()
                                .slice(0, 10)
                                .replaceAll("-", ".")}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
