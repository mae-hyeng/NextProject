"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Rate } from "antd";
import { CommentWrite } from "../comment-write";
import { useState } from "react";

export const CommentListItem = ({ comment }) => {
    const [isEdit, setIsEdit] = useState(false);

    const onClickCommentEdit = () => setIsEdit(true);

    const onClickCommentDelete = () => {};

    return (
        <>
            <div className={styles.comment_wrapper}>
                {isEdit ? (
                    <CommentWrite
                        key={comment._id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        comment={comment}
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
                                    {comment.writer}
                                </div>
                                <div>
                                    <Rate disabled allowHalf defaultValue={comment.rating} />
                                </div>
                            </div>
                            <div className={styles.detail_image_wrapper}>
                                <Image
                                    src={"/images/edit.png"}
                                    className={styles.detail_edit_image}
                                    onClick={onClickCommentEdit}
                                    alt="수정버튼"
                                    width={25}
                                    height={0}
                                />
                                <Image
                                    src={"/images/close.png"}
                                    className={styles.detail_delete_image}
                                    onClick={onClickCommentDelete}
                                    alt="삭제버튼"
                                    width={25}
                                    height={0}
                                />
                            </div>
                        </div>
                        <div>{comment.contents}</div>
                        <div className={styles.detail_comment_contents}>
                            {new Date(comment.createdAt)
                                .toISOString()
                                .slice(0, 10)
                                .replaceAll("-", ".")}
                        </div>
                    </>
                )}
            </div>
            <div className={styles.divideLine}></div>
        </>
    );
};
