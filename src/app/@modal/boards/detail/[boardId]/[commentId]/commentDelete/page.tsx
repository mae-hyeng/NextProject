"use client";

import styles from "./styles.module.css";
import { DELETE_BOARD_COMMENT } from "@/commons/apis/mutations/mutations";
import { ModalUI } from "@/commons/ui/modal";
import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

const BoardsDetailCommentDelete = () => {
    const router = useRouter();
    const params = useParams();

    const [password, setPassword] = useState("");

    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const closeDeleteModal = () => {
        router.back();
        setPassword("");
    };

    const onClickCommentDelete = async () => {
        try {
            await deleteBoardComment({
                variables: { boardCommentId: params.commentId, password },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchBoardComments: (prev, { readField }) => {
                                const deletedId = data.deleteBoardComment;
                                const filteredPrev = prev.filter(
                                    (el) => readField("_id", el) !== deletedId
                                );
                                return [...filteredPrev];
                            },
                        },
                    });
                },
            });

            Modal.success({
                content: "댓글을 삭제했습니다",
                onOk: () => router.back(),
            });
        } catch (error) {
            Modal.error({
                content: "비밀번호가 일치하지 않습니다!",
                onOk: () => setPassword(""),
            });
        }
    };

    return (
        <ModalUI open={true} onClose={closeDeleteModal}>
            <div className={styles.modal_title}>
                댓글을 작성할 때 입력하셨던 비밀번호를 입력해주세요.
            </div>
            <div className={styles.modal_input_button_wrapper}>
                <div className={styles.modal_input_wrapper}>
                    <input
                        type="password"
                        className={styles.modal_input}
                        onChange={onChangePassword}
                        value={password}
                    />
                </div>
                <div className={styles.modal_button_wrapper}>
                    <button className={styles.modal_button_cancel} onClick={closeDeleteModal}>
                        취소하기
                    </button>
                    <button className={styles.modal_button_submit} onClick={onClickCommentDelete}>
                        삭제하기
                    </button>
                </div>
            </div>
        </ModalUI>
    );
};

export default BoardsDetailCommentDelete;
