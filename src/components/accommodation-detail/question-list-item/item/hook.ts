import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useEffect, useState } from "react";
import { DELETE_TRAVEL_PRODUCT_QUESTION } from "../../question-write/queries";
import { useLoadStore } from "@/commons/stores/loadStore";
import { useAuthStore } from "@/commons/stores/authStore";

export const useQuestionListItem = ({ data }) => {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isSame, setIsSame] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [travelproductQuestionId, setTravelproductQuestionId] = useState("");

    const [deleteTravelProductQuestion] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION);

    const onClickQuestionEdit = () => setIsEdit(true);

    const { user: authUser } = useAuthStore();

    const handleOpenModal = (questionId) => () => {
        setIsModalOpen(true);
        setTravelproductQuestionId(questionId);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, [authUser]);

    useEffect(() => {
        if (user && data?.fetchTravelproduct?.seller?._id === user._id) {
            setIsSame(true);
        } else {
            setIsSame(false);
        }
    }, [user, data]);

    const onClickQuestionDelete = async () => {
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
            Modal.error({
                content: "상품 문의 삭제 권한이 존재하지 않습니다.",
                onOk: () => {
                    setIsModalOpen(false);
                },
            });
        }
    };

    const onClickReply = () => {
        setIsShow(!isShow);
    };

    return {
        isSame,
        isEdit,
        isShow,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        setIsShow,
        setIsEdit,
        onClickQuestionEdit,
        onClickQuestionDelete,
        onClickReply,
    };
};
