"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { ReplyWrite } from "../reply-write";
import { useReplyListItem } from "./hook";
import { ModalUI } from "@/commons/ui/modal";

export const ReplyListItem = ({ reply, question, isSame }) => {
    const {
        isEdit,
        setIsEdit,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        onClickReplyEdit,
        onClickReplyDelete,
    } = useReplyListItem();

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
                                        <Image
                                            src={"/images/close.png"}
                                            className={styles.detail_delete_image}
                                            onClick={handleOpenModal(reply._id)}
                                            alt="삭제버튼"
                                            width={25}
                                            height={0}
                                        />
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
            <ModalUI open={isModalOpen} onClose={handleCloseModal}>
                <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
                <div className={styles.modal_button_wrapper}>
                    <button className={styles.modal_button_cancel} onClick={handleCloseModal}>
                        취소하기
                    </button>
                    <button className={styles.modal_button_submit} onClick={onClickReplyDelete}>
                        삭제하기
                    </button>
                </div>
            </ModalUI>
        </>
    );
};
