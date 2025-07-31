import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
    DELETE_TRAVEL_PRODUCT_QUESTION,
    FETCH_TRAVEL_PRODUCT_QUESTIONS,
} from "../question-write/queries";

export const useQuestionListItem = () => {
    const [isEdit, setIsEdit] = useState(false);

    const [deleteTravelProductQuestion] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION);

    const onClickQuestionEdit = () => setIsEdit(true);

    const onClickQuestionDelete = (id) => {
        try {
            const result = deleteTravelProductQuestion({
                variables: { travelproductQuestionId: id },
                refetchQueries: [{ query: FETCH_TRAVEL_PRODUCT_QUESTIONS }],
            });

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isEdit,
        setIsEdit,
        onClickQuestionEdit,
        onClickQuestionDelete,
    };
};
