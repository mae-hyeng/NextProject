import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_BOARD_COMMENT } from "./queries";

export const UseBoardCommentListItem = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

    const onClickCommentEdit = () => setIsEdit(true);

    const onClickCommentDelete = async (boardCommentId) => {
        const password = prompt("비밀번호를 입력하세요");
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
            console.log(error);
        }
    };

    return {
        isEdit,
        setIsEdit,
        onClickCommentEdit,
        onClickCommentDelete,
    };
};
