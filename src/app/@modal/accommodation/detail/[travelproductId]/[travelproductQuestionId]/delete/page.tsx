"use client";

import { Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useMutation } from "@apollo/client";
import { DELETE_TRAVEL_PRODUCT_QUESTION } from "@/commons/apis/mutations/mutations";
import { useParams, useRouter } from "next/navigation";
import { ModalUI } from "@/commons/ui/modal";
import styles from "./styles.module.css";

const AccommodationDetailQuestionDelete = () => {
    const router = useRouter();
    const params = useParams();

    const [deleteTravelProductQuestion] = useMutation(DELETE_TRAVEL_PRODUCT_QUESTION);

    const closeQuestionDeleteModal = () => {
        router.back();
    };

    const onClickQuestionDelete = async () => {
        try {
            await deleteTravelProductQuestion({
                variables: { travelproductQuestionId: params.travelproductQuestionId },
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
            Modal.success({
                content: "문의글을 삭제했습니다.",
                onOk: () => router.back(),
            });
        } catch (error) {
            Modal.error({
                content: "문의글 삭제 권한이 존재하지 않습니다.",
                onOk: () => {
                    router.back();
                },
            });
        }
    };

    return (
        <ModalUI open={true} onClose={closeQuestionDeleteModal}>
            <div className={styles.modal_title}>문의글을 정말 삭제하시겠습니까?</div>
            <div className={styles.modal_button_wrapper}>
                <button className={styles.modal_button_cancel} onClick={closeQuestionDeleteModal}>
                    취소하기
                </button>
                <button className={styles.modal_button_submit} onClick={onClickQuestionDelete}>
                    삭제하기
                </button>
            </div>
        </ModalUI>
    );
};

export default AccommodationDetailQuestionDelete;
