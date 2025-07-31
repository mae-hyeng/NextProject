import { useMutation } from "@apollo/client";
import { useState } from "react";
import { DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER } from "../reply-write/queries";

export const useReplyListItem = ({ data, question, refetchQuestionData, refetchReplyData }) => {
    const [isEdit, setIsEdit] = useState(false);

    const [deleteTravelProductQuestionAnswer] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER);

    const onClickReplyEdit = () => setIsEdit(true);

    const onClickReplyDelete = async (id) => {
        try {
            const result = await deleteTravelProductQuestionAnswer({
                variables: { travelproductQuestionAnswerId: id },
            });
            await refetchReplyData({ travelproductQuestionId: question._id });

            console.log(result);
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
