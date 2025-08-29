"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from "@/commons/apis/mutations/mutations";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { IUseBoardCommentWriteProps } from "./types";
import { useAuthStore } from "@/commons/stores/authStore";

export const useBoardCommentWrite = ({
    comment,
    isEdit,
    setIsEdit,
    reset,
    setValue,
}: IUseBoardCommentWriteProps) => {
    const [user, setUser] = useState(null);
    const { user: authUser } = useAuthStore();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) setUser(userInfo);
    }, [authUser]);

    useEffect(() => {
        if (user?.name && !isEdit) {
            setValue("writer", user.name, { shouldValidate: true });
        }
    }, [user, isEdit]);

    useEffect(() => {
        if (comment) {
            reset({
                writer: comment.writer ?? "",
                contents: comment.contents ?? "",
            });
        }
    }, [comment]);

    const params = useParams();
    const [rating, setRating] = useState(2.5);

    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
    const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

    const onClickSubmitComment = async (data) => {
        const commentVariables = {
            createBoardCommentInput: {
                writer: data.writer,
                password: data.password,
                contents: data.contents,
                rating,
            },
            boardId: params.boardId,
        };

        await createBoardComment({
            variables: commentVariables,
            update(cache, { data }) {
                cache.modify({
                    fields: {
                        fetchBoardComments: (prev) => {
                            return [data.createBoardComment, ...prev];
                        },
                    },
                });
            },
        });

        resetCommentArea();
    };

    const onClickUpdateComment = async (data) => {
        const commentVariables = {
            updateBoardCommentInput: {
                contents: data.contents,
                rating: rating,
            },
            boardCommentId: comment._id,
            password: data.password,
        };

        try {
            const result = await updateBoardComment({
                variables: commentVariables,
            });

            if (result?.data) {
                setIsEdit(false);
            }
        } catch (error) {
            Modal.error({
                content: "비밀번호가 일치하지 않습니다",
            });
        }
    };

    const onChangeRating = (e) => {
        setRating(e);
    };

    const resetCommentArea = () => {
        setValue("writer", "");
        setValue("password", "");
        setValue("contents", "");
        setRating(2.5);
    };

    return {
        rating,
        onClickSubmitComment,
        onClickUpdateComment,
        onChangeRating,
    };
};
