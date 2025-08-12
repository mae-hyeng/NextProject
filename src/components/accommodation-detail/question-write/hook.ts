"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { CREATE_TRAVEL_PRODUCT_QUESTION, UPDATE_TRAVEL_PRODUCT_QUESTION } from "./queries";

export const useQuestionWrite = ({ question, setIsEdit }) => {
    useEffect(() => {
        if (question) setContents(question?.contents ?? "");
    }, [question]);

    const params = useParams();
    const [contents, setContents] = useState("");

    const [createTravelProductQuestion] = useMutation(CREATE_TRAVEL_PRODUCT_QUESTION);
    const [updateTravelProductQuestion] = useMutation(UPDATE_TRAVEL_PRODUCT_QUESTION);

    const onClickSubmitQuestion = async () => {
        const variables = {
            createTravelproductQuestionInput: {
                contents: contents,
            },
            travelproductId: params.travelproductId,
        };

        await createTravelProductQuestion({
            variables,
            update(cache, { data }) {
                cache.modify({
                    fields: {
                        fetchTravelproductQuestions: (prev) => {
                            return [data.createTravelproductQuestion, ...prev];
                        },
                    },
                });
            },
        });

        resetQuestionArea();
    };

    const onClickUpdateQuestion = async () => {
        const variables = {
            updateTravelproductQuestionInput: { contents },
            travelproductQuestionId: question._id,
        };
        try {
            const result = await updateTravelProductQuestion({
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

    const resetQuestionArea = () => {
        setContents("");
    };

    return {
        contents,
        onClickSubmitQuestion,
        onClickUpdateQuestion,
        onChangeInput,
    };
};
