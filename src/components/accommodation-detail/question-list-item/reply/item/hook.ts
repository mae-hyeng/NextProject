import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER } from "../reply-write/queries";
import { IUseReplyListItem } from "./types";

export const useReplyListItem = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [deleteTravelProductQuestionAnswer] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER);

    const onClickReplyEdit = () => setIsEdit(true);

    const onClickReplyDelete = async (id) => {
        try {
            await deleteTravelProductQuestionAnswer({
                variables: { travelproductQuestionAnswerId: id },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchTravelproductQuestionAnswers: (prev, { readField }) => {
                                const deletedId = data.deleteTravelproductQuestionAnswer;
                                const filteredAnswers = prev.filter(
                                    (answers) => readField("_id", answers) !== deletedId
                                );
                                return [...filteredAnswers];
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
        onClickReplyEdit,
        onClickReplyDelete,
    };
};
