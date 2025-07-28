"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS, UPDATE_BOARD_COMMENT } from "./queries";
import { ChangeEvent, useEffect, useState } from "react";

export const useBoardComment = ({ comment, setIsEdit }) => {
    useEffect(() => {
        if (comment) setContents(comment?.contents ?? "");
    }, [comment]);

    const params = useParams();
    const [writer, setWriter] = useState("");
    const [password, setPassword] = useState("");
    const [contents, setContents] = useState("");
    const [rating, setRating] = useState(2.5);

    const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
    const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

    const onClickSubmitComment = async () => {
        const commentVariables = {
            createBoardCommentInput: {
                writer: writer,
                password: password,
                contents: contents,
                rating: rating,
            },
            boardId: params.boardId,
        };

        const result = await createBoardComment({
            variables: commentVariables,
            refetchQueries: [
                {
                    query: FETCH_BOARD_COMMENTS,
                    variables: { boardId: params.boardId },
                },
            ],
        });

        console.log(result);
        resetCommentArea();
    };

    const onClickUpdateComment = async () => {
        const commentVariables = {
            updateBoardCommentInput: {
                contents: contents,
                rating: rating,
            },
            boardCommentId: comment._id,
            password: password,
        };

        try {
            const result = await updateBoardComment({
                variables: commentVariables,
            });

            if (result?.data) {
                setIsEdit(false);
            }
        } catch (error) {
            alert("비밀번호가 일치하지 않습니다");
        }
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "writer") setWriter(value);
        else if (name === "password") setPassword(value);
        else if (name === "contents") setContents(value);

        console.log(value);
    };

    const onChangeRating = (e) => {
        console.log(e);
        setRating(e);
    };

    const resetCommentArea = () => {
        setWriter("");
        setPassword("");
        setContents("");
        setRating(2.5);
    };

    return {
        writer,
        password,
        contents,
        rating,
        onClickSubmitComment,
        onClickUpdateComment,
        onChangeInput,
        onChangeRating,
    };
};
