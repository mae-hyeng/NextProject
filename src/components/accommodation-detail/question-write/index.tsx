"use client";

import { useQuestionWrite } from "./hook";
import styles from "./styles.module.css";

import { ICommentWriteProps } from "./types";

export const QuestionWrite = ({ isEdit, setIsEdit, question }: ICommentWriteProps) => {
    const { contents, onClickSubmitQuestion, onClickUpdateQuestion, onChangeInput } =
        useQuestionWrite({ question, setIsEdit });

    return (
        <div className={isEdit ? styles.detail_reg_question_edit : styles.detail_reg_question}>
            <textarea
                onChange={onChangeInput}
                name="contents"
                placeholder="문의사항을 입력해 주세요."
                value={contents}
            ></textarea>
            <div className={styles.detail_question_btn_wrapper}>
                <button onClick={isEdit ? onClickUpdateQuestion : onClickSubmitQuestion}>
                    문의하기
                </button>
            </div>
        </div>
    );
};
