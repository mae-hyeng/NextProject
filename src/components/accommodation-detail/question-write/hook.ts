"use client";

import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { ChangeEvent, useEffect, useState } from "react";
import {
    CREATE_TRAVEL_PRODUCT_QUESTION,
    UPDATE_TRAVEL_PRODUCT_QUESTION,
} from "@/commons/apis/mutations/mutations";

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
            Modal.error({
                content: "상품 문의 수정 권한이 존재하지 않습니다.",
                onOk: () => {
                    setIsEdit(false);
                },
            });
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
