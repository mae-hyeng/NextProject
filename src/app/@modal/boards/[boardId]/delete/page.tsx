"use client";

import { ModalUI } from "@/commons/ui/modal";
import styles from "./styles.module.css";
import { useParams, useRouter } from "next/navigation";
import { DeleteBoardDocument } from "@/commons/graphql/graphql";
import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

const BoardsDelete = () => {
    const router = useRouter();
    const params = useParams();

    const [deleteBoard] = useMutation(DeleteBoardDocument);

    const closeDeleteBoardModal = () => router.back();

    const onClickDeleteBoard = async () => {
        try {
            await deleteBoard({
                variables: {
                    boardId: Array.isArray(params.boardId) ? params.boardId[0] : params.boardId,
                },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchBoards: (prev, { readField }) => {
                                const deletedId = data.deleteBoard;
                                const filteredBoard = prev.filter(
                                    (board) => readField("_id", board) !== deletedId
                                );
                                return [...filteredBoard];
                            },
                        },
                    });
                },
            });
            Modal.success({
                content: "게시물을 삭제했습니다!",
                onOk: () => router.back(),
            });
        } catch (error) {
            Modal.error({
                content: "게시물 삭제 권한이 없습니다.",
                onOk: () => router.back(),
            });
        }
    };

    return (
        <ModalUI open={true} onClose={closeDeleteBoardModal}>
            <div className={styles.modal_title}>정말 삭제하시겠습니까?</div>
            <div className={styles.modal_input_button_wrapper}>
                <div className={styles.modal_button_wrapper}>
                    <button className={styles.modal_button_cancel} onClick={closeDeleteBoardModal}>
                        취소하기
                    </button>
                    <button className={styles.modal_button_submit} onClick={onClickDeleteBoard}>
                        삭제하기
                    </button>
                </div>
            </div>
        </ModalUI>
    );
};

export default BoardsDelete;
