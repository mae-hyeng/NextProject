"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Rate } from "antd";
import { useState } from "react";
import { QuestionWrite } from "../question-write";
import { useQuestionListItem } from "./hook";

export const QuestionListItem = ({ question }) => {
    const { isEdit, setIsEdit, onClickQuestionEdit, onClickQuestionDelete } = useQuestionListItem();

    return (
        <>
            <div className={styles.question_wrapper}>
                {isEdit ? (
                    <QuestionWrite
                        key={question._id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        question={question}
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
                                    {question.user.name}
                                </div>
                            </div>
                            <div className={styles.detail_image_wrapper}>
                                <Image
                                    src={"/images/edit.png"}
                                    className={styles.detail_edit_image}
                                    onClick={onClickQuestionEdit}
                                    alt="수정버튼"
                                    width={25}
                                    height={0}
                                />
                                <Image
                                    src={"/images/close.png"}
                                    className={styles.detail_delete_image}
                                    onClick={() => onClickQuestionDelete(question._id)}
                                    alt="삭제버튼"
                                    width={25}
                                    height={0}
                                />
                            </div>
                        </div>
                        <div>{question.contents}</div>
                        <div className={styles.detail_question_contents}>
                            {new Date(question.createdAt)
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
