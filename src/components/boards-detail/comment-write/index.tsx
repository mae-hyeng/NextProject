"use client";

import styles from "./styles.module.css";
import { useBoardCommentWrite } from "./hook";

import { Rate } from "antd";
import { ICommentWriteProps } from "./types";

export const CommentWrite = ({ isEdit, setIsEdit, comment }: ICommentWriteProps) => {
    const {
        writer,
        password,
        contents,
        rating,
        onClickSubmitComment,
        onClickUpdateComment,
        onChangeInput,
        onChangeRating,
    } = useBoardCommentWrite({ comment, setIsEdit });

    return (
        <div className={isEdit ? styles.detail_reg_comment_edit : styles.detail_reg_comment}>
            <Rate allowHalf onChange={onChangeRating} value={rating} />
            <div className={styles.writer_password_wrapper}>
                <div className={styles.writer_wrapper}>
                    <div>
                        작성자
                        <span className={styles.require_input}>*</span>
                    </div>
                    <input
                        onChange={onChangeInput}
                        name="writer"
                        placeholder="작성자 명을 입력해 주세요."
                        value={comment?.writer ?? writer}
                        disabled={isEdit}
                    />
                </div>
                <div className={styles.password_wrapper}>
                    <div>
                        비밀번호<span className={styles.require_input}>*</span>
                    </div>
                    <input
                        onChange={onChangeInput}
                        name="password"
                        placeholder="비밀번호를 입력해 주세요."
                        type="password"
                        value={password}
                    />
                </div>
            </div>
            <textarea
                onChange={onChangeInput}
                name="contents"
                placeholder="댓글을 입력해 주세요."
                value={contents}
            ></textarea>
            <div className={styles.detail_reg_comment_btn_wrapper}>
                <button onClick={isEdit ? onClickUpdateComment : onClickSubmitComment}>
                    댓글 {isEdit ? "수정" : "등록"}
                </button>
            </div>
        </div>
    );
};
