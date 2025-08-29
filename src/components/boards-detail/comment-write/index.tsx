"use client";

import styles from "./styles.module.css";
import { useBoardCommentWrite } from "./hook";

import { Rate } from "antd";
import { ICommentWriteProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boardCommentSchema } from "./schema";

export const CommentWrite = ({ isEdit, setIsEdit, comment }: ICommentWriteProps) => {
    const { register, handleSubmit, formState, reset, setValue } = useForm({
        resolver: zodResolver(boardCommentSchema),
        mode: "onChange",
    });

    const { rating, onClickSubmitComment, onClickUpdateComment, onChangeRating } =
        useBoardCommentWrite({ comment, isEdit, setIsEdit, reset, setValue });

    return (
        <form
            onSubmit={
                isEdit ? handleSubmit(onClickUpdateComment) : handleSubmit(onClickSubmitComment)
            }
        >
            <div className={isEdit ? styles.detail_reg_comment_edit : styles.detail_reg_comment}>
                <Rate allowHalf onChange={onChangeRating} value={rating} />
                <div className={styles.writer_password_wrapper}>
                    <div className={styles.writer_wrapper}>
                        <div>
                            작성자
                            <span className={styles.require_input}>*</span>
                        </div>
                        <input
                            {...register("writer")}
                            placeholder="작성자 명을 입력해 주세요."
                            disabled
                        />
                        <div className={styles.error}>{formState.errors.writer?.message}</div>
                    </div>
                    <div className={styles.password_wrapper}>
                        <div>
                            비밀번호<span className={styles.require_input}>*</span>
                        </div>
                        <input
                            {...register("password")}
                            placeholder="비밀번호를 입력해 주세요."
                            type="password"
                        />
                        <div className={styles.error}>{formState.errors.password?.message}</div>
                    </div>
                </div>
                <textarea {...register("contents")} placeholder="댓글을 입력해 주세요."></textarea>
                <div className={styles.error}>{formState.errors.contents?.message}</div>
                <div className={styles.detail_reg_comment_btn_wrapper}>
                    <button disabled={!formState.isValid}>댓글 {isEdit ? "수정" : "등록"}</button>
                </div>
            </div>
        </form>
    );
};
