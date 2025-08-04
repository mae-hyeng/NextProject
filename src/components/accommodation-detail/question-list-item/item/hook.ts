import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { DELETE_TRAVEL_PRODUCT_QUESTION } from "../../question-write/queries";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/commons/stores/authStore";

export const useQuestionListItem = ({ data, refetchQuestionData }) => {
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

    const onClickQuestionDelete = async (id) => {
        try {
            const result = await deleteTravelProductQuestion({
                variables: { travelproductQuestionId: id },
            });
            await refetchQuestionData({ travelproductId: params.travelproductId });

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    const onClickReply = () => {
        setIsShow(!isShow);
        console.log(isShow);
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
