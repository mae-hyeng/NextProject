import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_BOARD_COMMENT } from "./queries";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";

export const UseBoardCommentListItem = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

    const onClickCommentEdit = () => setIsEdit(true);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [password, setPassword] = useState("");
    const [boardCommentId, setBoardCommentId] = useState("");

    const onClickCommentDelete = async () => {
        try {
            await deleteBoardComment({
                variables: { boardCommentId, password },
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
        } catch (error) {
            Modal.error({
                content: "비밀번호가 일치하지 않습니다!",
                onOk: () => {
                    setPassword("");
                },
            });
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setPassword("");
    };

    const openDeleteModal = (commentId) => () => {
        setIsDeleteModalOpen(true);
        setBoardCommentId(commentId);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return {
        isEdit,
        isDeleteModalOpen,
        password,
        setIsEdit,
        openDeleteModal,
        closeDeleteModal,
        onClickCommentEdit,
        onClickCommentDelete,
        onChangePassword,
    };
};
