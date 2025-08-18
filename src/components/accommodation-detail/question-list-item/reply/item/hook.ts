import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useState } from "react";
import { DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER } from "../reply-write/queries";

export const useReplyListItem = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [travelproductQuestionAnswerId, setTravelproductQuestionAnswerId] = useState("");

    const [deleteTravelProductQuestionAnswer] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION_ANSWER);

    const handleOpenModal = (questionAnswerId) => () => {
        setIsModalOpen(true);
        setTravelproductQuestionAnswerId(questionAnswerId);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const onClickReplyEdit = () => setIsEdit(true);

    const onClickReplyDelete = async () => {
        try {
            await deleteTravelProductQuestionAnswer({
                variables: { travelproductQuestionAnswerId },
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
            Modal.error({
                content: "상품 문의 삭제 권한이 존재하지 않습니다.",
                onOk: () => {
                    setIsModalOpen(false);
                },
            });
        }
    };

    return {
        isEdit,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        setIsEdit,
        onClickReplyEdit,
        onClickReplyDelete,
    };
};
