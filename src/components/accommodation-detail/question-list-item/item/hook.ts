import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { DELETE_TRAVEL_PRODUCT_QUESTION } from "../../question-write/queries";
import { useParams } from "next/navigation";

export const useQuestionListItem = ({ data }) => {
    const params = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [isSame, setIsSame] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const [deleteTravelProductQuestion] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION);

    const onClickQuestionEdit = () => setIsEdit(true);

    const user = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (user && data?.fetchTravelproduct?.seller?._id === user._id) {
            setIsSame(true);
        } else {
            setIsSame(false);
        }
    }, [user, data]);

    const onClickQuestionDelete = async (travelproductQuestionId) => {
        try {
            await deleteTravelProductQuestion({
                variables: { travelproductQuestionId },
                update(cache, { data }) {
                    cache.modify({
                        fields: {
                            fetchTravelproductQuestions: (prev, { readField }) => {
                                const deletedId = data.deleteTravelproductQuestion;
                                const filteredData = prev.filter(
                                    (comment) => readField("_id", comment) !== deletedId
                                );
                                return [...filteredData];
                            },
                        },
                    });
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onClickReply = () => {
        setIsShow(!isShow);
    };

    return {
        isSame,
        isEdit,
        isShow,
        setIsShow,
        setIsEdit,
        onClickQuestionEdit,
        onClickQuestionDelete,
        onClickReply,
    };
};
