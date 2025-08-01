"use client";

import { useReplyWrite } from "./hook";
import styles from "./styles.module.css";
import { IReplyWriteProps } from "./types";

export const ReplyWrite = ({
    isEdit,
    setIsShow,
    question,
    setIsEdit,
    refetchReplyData,
    reply,
}: IReplyWriteProps) => {
    const { contents, onClickSubmitReply, onClickUpdateReply, onChangeInput } = useReplyWrite({
        setIsEdit,
        setIsShow,
        refetchReplyData,
    });

    return (
        <div className={isEdit ? styles.detail_reg_reply_edit : styles.detail_reg_reply}>
            <textarea
                onChange={onChangeInput}
                name="contents"
                placeholder="답변할 내용을 입력해 주세요."
                value={contents}
            ></textarea>
            <div className={styles.detail_reply_btn_wrapper}>
                <button
                    onClick={
                        isEdit
                            ? () => onClickUpdateReply(reply)
                            : () => onClickSubmitReply(question)
                    }
                >
                    답변하기
                </button>
            </div>
        </div>
    );
};
