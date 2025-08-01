"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useQuestionListItem } from "./hook";
import { QuestionWrite } from "../../question-write";
import { ReplyWrite } from "../reply/reply-write";
import { useQuery } from "@apollo/client";
import { FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER } from "../reply/reply-write/queries";
import { ReplyListItem } from "../reply/item";

export const QuestionListItem = ({ data, question, refetchQuestionData }) => {
    const {
        isSame,
        isEdit,
        isShow,
        setIsEdit,
        setIsShow,
        onClickQuestionEdit,
        onClickQuestionDelete,
        onClickReply,
    } = useQuestionListItem({
        data,
        refetchQuestionData,
    });

    const { data: replyData, refetch: refetchReplyData } = useQuery(
        FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER,
        {
            variables: { travelproductQuestionId: question._id },
        }
    );

    return (
        <>
            <div className={styles.question_wrapper}>
                {isEdit ? (
                    <QuestionWrite
                        key={question._id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        question={question}
                        refetchQuestionData={refetchQuestionData}
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
                        {isSame && (
                            <div className={styles.reply_button_wrapper} onClick={onClickReply}>
                                <Image
                                    src="/images/reply.png"
                                    alt="답글이미지"
                                    width={25}
                                    height={25}
                                />
                                답변하기
                            </div>
                        )}
                        {isShow && (
                            <ReplyWrite
                                isEdit={false}
                                setIsShow={setIsShow}
                                question={question}
                                refetchReplyData={refetchReplyData}
                                replyData={replyData}
                            />
                        )}
                        {replyData?.fetchTravelproductQuestionAnswers.map((reply) => (
                            <ReplyListItem
                                key={reply._id}
                                reply={reply}
                                question={question}
                                refetchQuestionData={refetchQuestionData}
                                refetchReplyData={refetchReplyData}
                            />
                        ))}
                    </>
                )}
            </div>
            <div className={styles.divideLine}></div>
        </>
    );
};
