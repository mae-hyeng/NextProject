"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useQuestionListItem } from "./hook";
import { QuestionWrite } from "../../question-write";
import { ReplyWrite } from "../reply/reply-write";
import { useQuery } from "@apollo/client";
import { FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER } from "@/commons/apis/queries/queries";
import { ReplyListItem } from "../reply/item";
import { ModalUI } from "@/commons/ui/modal";
import { IQuestionListItemProps } from "./types";

export const QuestionListItem = ({ data, question }: IQuestionListItemProps) => {
    const {
        isSame,
        isEdit,
        isShow,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        setIsEdit,
        setIsShow,
        onClickQuestionEdit,
        onClickQuestionDelete,
        onClickReply,
    } = useQuestionListItem({
        data,
    });

    const { data: replyData } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS_ANSWER, {
        variables: { travelproductQuestionId: question._id },
    });

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
                            {isSame && (
                                <div className={styles.question_detail_image_wrapper}>
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
                                        onClick={handleOpenModal(question._id)}
                                        alt="삭제버튼"
                                        width={25}
                                        height={0}
                                    />
                                </div>
                            )}
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
                                replyData={replyData}
                            />
                        )}
                        {replyData?.fetchTravelproductQuestionAnswers.map((reply) => (
                            <ReplyListItem
                                key={reply._id}
                                reply={reply}
                                question={question}
                                isSame={isSame}
                            />
                        ))}
                    </>
                )}
            </div>
            <div className={styles.divideLine}></div>
            <ModalUI open={isModalOpen} onClose={handleCloseModal}>
                <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
                <div className={styles.modal_button_wrapper}>
                    <button className={styles.modal_button_cancel} onClick={handleCloseModal}>
                        취소하기
                    </button>
                    <button className={styles.modal_button_submit} onClick={onClickQuestionDelete}>
                        삭제하기
                    </button>
                </div>
            </ModalUI>
        </>
    );
};
