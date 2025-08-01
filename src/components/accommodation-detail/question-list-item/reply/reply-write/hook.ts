"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
    CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
    UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER,
} from "./queries";
import { IReplyWriteProps } from "./types";

export const useReplyWrite = ({
    question,
    setIsEdit,
    setIsShow,
    refetchReplyData,
}: IReplyWriteProps) => {
    useEffect(() => {
        if (question) setContents(question?.contents ?? "");
    }, [question]);

    const params = useParams();
    const [contents, setContents] = useState("");

    const [createTravelProductQuestionAnswer] = useMutation(CREATE_TRAVEL_PRODUCT_QUESTION_ANSWER);
    const [updateTravelProductQuestionAnswer] = useMutation(UPDATE_TRAVEL_PRODUCT_QUESTION_ANSWER);

    const onClickSubmitReply = async (question) => {
        const variables = {
            createTravelproductQuestionAnswerInput: {
                contents: contents,
            },
            travelproductQuestionId: question._id,
        };

        const result = await createTravelProductQuestionAnswer({ variables });
        await refetchReplyData({ travelproductQuestionId: question._id });

        resetReplyArea();
    };

    const onClickUpdateReply = async (reply) => {
        const variables = {
            updateTravelproductQuestionAnswerInput: { contents },
            travelproductQuestionAnswerId: reply._id,
        };
        try {
            const result = await updateTravelProductQuestionAnswer({
                variables,
            });
            if (result?.data) {
                setIsEdit(false);
            }
        } catch (error) {
            alert(error);
        }
    };

    const onChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "contents") setContents(value);
    };

    const resetReplyArea = () => {
        setContents("");
        setIsShow(false);
    };

    return {
        contents,
        onClickSubmitReply,
        onClickUpdateReply,
        onChangeInput,
    };
};
